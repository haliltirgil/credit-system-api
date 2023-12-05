import { LessThan } from 'typeorm';
import { Installment } from '../models/installment';
import { INTEREST_VALUE, OVERDATE } from '../constants/const-variables';
import { InstallmentStatus } from '../enums/enum-variables';

/**
 * Service class for managing installment-related operations.
 *
 * @remarks
 * This class includes a method for finding installments that are out of date.
 */
export class InstallmentService {
  /**
   * Finds installments that are out of date based on the provided current date.
   *
   * @param currentDate - The current date used to find out-of-date installments.
   *
   * @returns A Promise that resolves to an array of out-of-date installments.
   */
  static async findOutOfDateInstallments(currentDate: Date) {
    const installments = await Installment.find({
      where: { dueDate: LessThan(currentDate) },
      relations: { credit: true },
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const installment of installments) {
      installment.totalInterest += (OVERDATE * INTEREST_VALUE * installment.amount) / 360;
      installment.status = InstallmentStatus.OutOfDate;
      // eslint-disable-next-line no-await-in-loop
      await installment.save();
    }
  }
}
