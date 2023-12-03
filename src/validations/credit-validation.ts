import { bodyNumber } from './custom-validations/number-validation';

/**
 * TODO: write validations
 */
export class CreditValidation {
  public static takeCredit = [bodyNumber('amount')];
}
