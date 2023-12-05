import { Request, Response } from 'express';
import { MoreThanOrEqual } from 'typeorm';
import { User } from '../models/user';
import { NotFoundError } from '../errors/not-found-error';
import { Credit } from '../models/credit';
import { CreditStatus, InstallmentStatus } from '../enums/enum-variables';
import { Installment } from '../models/installment';
import { calculateMonthWeekdays } from '../utils/calculate-weekdays';
import { calculateInstallments } from '../utils/calculate-installments';
import { BadRequestError } from '../errors/bad-request-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { catchError } from '../utils/catch-custom-error';
import { DataSourceUtil } from '../utils/get-data-source';

/**
 * Controller class for managing credit-related operations.
 *
 * @remarks
 * This class includes methods for taking credit, retrieving user credits by status, and repaying credit installments.
 */
export class CreditController {
  /**
   * Takes a credit for a user and creates corresponding installments.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   *
   * @throws {NotFoundError} if the user is not found.
   */
  public static async takeCredit(req: Request, res: Response): Promise<void> {
    const { userId, amount, installmentCount } = req.body;

    // Start transaction
    const queryRunner = DataSourceUtil.getDataSource().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find user
      const user = await queryRunner.manager.findOne(User, { where: { id: userId } });

      if (!user) {
        throw new NotFoundError('Error', 'User not found!');
      }

      // Create credit
      const credit = new Credit();
      credit.status = CreditStatus.Approved;
      credit.amount = amount;
      credit.installmentCount = installmentCount;
      credit.user = user;

      await queryRunner.manager.save(credit);

      const installmentAmounts = calculateInstallments(amount, installmentCount);
      const installmentDates = calculateMonthWeekdays(new Date(), installmentCount);

      // Create installments
      for (let i = 0; i < installmentCount; i++) {
        const installment = new Installment();
        installment.amount = installmentAmounts[i];
        installment.status = InstallmentStatus.NotPaid;
        installment.credit = credit;
        installment.dueDate = installmentDates[i];
        // eslint-disable-next-line no-await-in-loop
        await queryRunner.manager.save(installment);
      }

      // Find created installments
      const installments = await queryRunner.manager.find(Installment, { where: { credit: { id: credit.id } } });

      // Commit transaction
      await queryRunner.commitTransaction();

      res.status(201).send({
        message: 'Credit created successfully!',
        result: {
          creditId: credit.id,
          installments,
        },
      });
    } catch (err) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      const error = catchError(err);
      res.status(error.statusCode).send(error.body);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Retrieves user credits by status.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   *
   * @throws {NotFoundError} if the user is not found.
   */
  public static async getUserCreditByFilters(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const { status, startDate, limit, page } = req.query;

    const user = await User.findOneBy({
      id: Number(userId),
    });

    if (!user) {
      throw new NotFoundError('Error', 'User not found!');
    }

    const result = await Credit.find({
      where: {
        user: { id: Number(userId) },
        status: Number(status),
        createdAt: MoreThanOrEqual(new Date(startDate as string)),
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
      order: { createdAt: 'DESC' },
    });

    res.status(200).send(result);
  }

  /**
   * Repays a credit installment for a user.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   *
   * @throws {NotFoundError} if the user credit or installment is not found.
   * @throws {ForbiddenError} if the installment does not belong to the specified credit.
   * @throws {BadRequestError} if the payment amount is greater than the debt.
   */
  public static async repayCreditInstallment(req: Request, res: Response) {
    const { userId } = req.params;
    const { installmentId, amount } = req.body;

    // Start transaction
    const queryRunner = DataSourceUtil.getDataSource().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const installment = await queryRunner.manager.findOne(Installment, {
        where: { id: Number(installmentId) },
        relations: { credit: { user: true } },
      });

      if (!installment) {
        throw new NotFoundError('Error', 'Installment not found!');
      }

      if (installment.credit.user.id !== Number(userId) || installment.status === InstallmentStatus.Paid) {
        throw new ForbiddenError('Authorization Error', 'You are not authorized to use this API.');
      }

      const installmentCredit = installment.credit;

      if (Number(amount) > Number(installment.amount) + Number(installment.totalInterest)) {
        throw new BadRequestError('Error', 'Payment cannot be greater than the debt!');
      }

      const tmpTotalInterest = installment.totalInterest;
      const tmpInstallmentAmount = installment.amount;

      if (Number(amount) < Number(installment.amount) + Number(installment.totalInterest)) {
        installment.status = InstallmentStatus.PartialPaid;
        installment.amount = Number(installment.amount) + Number(tmpTotalInterest) - Number(amount);
        installment.totalInterest =
          Number(installment.totalInterest) +
          Number(tmpInstallmentAmount) -
          Number(amount) -
          Number(installment.amount);

        installmentCredit.amount -= amount;
        installmentCredit.status = CreditStatus.PaymentStage;

        await queryRunner.manager.save(installmentCredit);
        await queryRunner.manager.save(installment);

        return res.status(200).send({ message: 'Partial payment successful!', result: installment });
      }

      installment.status = InstallmentStatus.Paid;
      installment.amount = Number(installment.amount) + Number(tmpTotalInterest) - Number(amount);
      installment.totalInterest = Number(installment.totalInterest) + Number(tmpInstallmentAmount) - Number(amount);
      await queryRunner.manager.save(installment);

      installmentCredit.installmentCount--;
      installmentCredit.amount -= amount;
      installmentCredit.status = installmentCredit.amount <= 0 ? CreditStatus.Completed : CreditStatus.PaymentStage;

      await queryRunner.manager.save(installmentCredit);

      // Commit transaction
      await queryRunner.commitTransaction();

      return res.status(200).send({ message: 'Payment successful!', result: installment });
    } catch (err) {
      // Rollback transaction on error
      await queryRunner.rollbackTransaction();
      const error = catchError(err);
      return res.status(error.statusCode).send(error.body);
    } finally {
      await queryRunner.release();
    }
  }
}
