import { bodyId, paramId } from './custom-validations/id-validation';
import { bodyFloat, bodyNumber } from './custom-validations/number-validation';

export class CreditValidation {
  public static takeCredit = [bodyId('userId'), bodyFloat('amount'), bodyNumber('installmentCount')];

  public static getUserCreditByStatus = [paramId('userId')];

  public static repayCreditInstallment = [paramId('userId'), bodyId('installmentId'), bodyFloat('amount')];
}
