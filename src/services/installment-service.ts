import { LessThan } from 'typeorm';
import { Installment } from '../models/installment';
import { INTEREST_VALUE, OVERDATE } from '../constants/const-variables';

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
    const installments = await Installment.findBy({ dueDate: LessThan(currentDate) });

    // eslint-disable-next-line no-restricted-syntax
    for (const installment of installments) {
      installment.totalInterest = (OVERDATE * INTEREST_VALUE * installment.remainingTotalAmount) / 360;

      // eslint-disable-next-line no-await-in-loop
      await installment.save();
    }
  }
}
