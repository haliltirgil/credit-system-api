import { Request, Response } from 'express';
import { User } from '../models/user';
import { NotFoundError } from '../errors/not-found-error';
import { Credit } from '../models/credit';
import { CreditStatus, InstallmentStatus } from '../enums/enum-variables';
import { Installment } from '../models/installment';
import { calculateMonthWeekdays } from '../utils/calculate-weekdays';
import { calculateInstallments } from '../utils/calculate-installments';
import { ForbiddenError } from '../errors/forbidden-error';
import { BadRequestError } from '../errors/bad-request-error';

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

    const user = await User.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundError('Error', 'User not found!');
    }

    const credit = new Credit();
    credit.status = CreditStatus.Approved;
    credit.amount = amount;
    credit.installmentCount = installmentCount;
    credit.user = userId;
    await credit.save();

    const installmentAmounts = calculateInstallments(amount, installmentCount);
    const installmentDates = calculateMonthWeekdays(new Date(), installmentCount);

    for (let i = 0; i < installmentCount; i++) {
      const installment = new Installment();
      installment.amount = installmentAmounts[i];
      installment.status = InstallmentStatus.NotPaid;
      installment.credit = credit;
      installment.dueDate = installmentDates[i];

      // eslint-disable-next-line no-await-in-loop
      await installment.save();
    }

    const installments = await Installment.find({ where: { credit: { id: credit.id } } });

    res.status(201).send({
      message: 'Credit created successfully!',
      result: {
        creditId: credit.id,
        installments,
      },
    });
  }

  /**
   * Retrieves user credits by status.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   *
   * @throws {NotFoundError} if the user is not found.
   */
  public static async getUserCreditByStatus(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const user = await User.findOneBy({
      id: Number(userId),
    });

    if (!user) {
      throw new NotFoundError('Error', 'User not found!');
    }

    // TODO: edit this query
    const result = await Credit.find({ where: { status: 0 } });

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

    const credit = await Credit.findOne({
      where: { user: { id: Number(userId) }, installments: { id: installmentId } },
      relations: ['installments'],
    });

    if (!credit) {
      throw new NotFoundError('Error', 'Related user credit not found!');
    }

    const installment = await Installment.findOne({ where: { id: installmentId }, relations: ['credit'] });

    if (!installment) {
      throw new NotFoundError('Error', 'Installment not found!');
    }

    // Check installment user relation
    credit.installments.forEach((item) => {
      if (item.id !== installment.id) {
        throw new ForbiddenError();
      }
    });

    if (amount > installment.amount) {
      throw new BadRequestError('Error', 'Payment cannot be greater than the debt!');
    }

    if (amount < installment.amount) {
      installment.status = InstallmentStatus.PartialPaid;
      installment.amount -= amount;
      credit.amount -= amount;
      credit.status = CreditStatus.PaymentStage;

      await credit.save();
      await installment.save();

      return res.status(200).send({ message: 'Partial payment successful!', result: installment });
    }

    installment.status = InstallmentStatus.Paid;
    installment.amount -= amount;
    await installment.save();

    credit.installmentCount--;
    credit.amount -= amount;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    credit.amount <= 0 ? (credit.status = CreditStatus.Completed) : CreditStatus.PaymentStage;
    await credit.save();

    return res.status(200).send({ message: 'Payment successful!', result: installment });
  }
}
