import { LessThan } from 'typeorm';
import { Installment } from '../models/installment';

export class InstallmentService {
  /**
   * TODO: write logic for here
   * @param currentDate
   */
  static async findOutOfDateInstallments(currentDate: Date) {
    const installments = await Installment.findBy({ dueDate: LessThan(currentDate) });

    return installments;
  }
}
