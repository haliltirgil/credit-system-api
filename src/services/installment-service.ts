import { LessThan } from 'typeorm';
import { Installment } from '../models/installment';

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
   * TOOD: write logic
   */
  static async findOutOfDateInstallments(currentDate: Date) {
    const installments = await Installment.findBy({ dueDate: LessThan(currentDate) });

    return installments;
  }
}
