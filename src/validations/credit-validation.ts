import { queryDate } from './custom-validations/date-validation';
import { bodyId, paramId } from './custom-validations/id-validation';
import { bodyFloat, bodyNumber, queryNumber } from './custom-validations/number-validation';

export class CreditValidation {
  public static takeCredit = [bodyId('userId'), bodyFloat('amount'), bodyNumber('installmentCount')];

  public static getUserCreditByFilters = [
    queryNumber('status').isInt({ min: 0 }).withMessage(`Parameter "status" must be 0 or greater then equal 0.`),
    queryNumber('limit').isInt({ min: 1 }).withMessage(`Parameter "limit" must be 1 or greater then equal 1.`),
    queryNumber('page').isInt({ min: 1 }).withMessage(`Parameter "page" must be 1 or greater then equal 1.`),
    queryDate('startDate'),
    paramId('userId'),
  ];

  public static repayCreditInstallment = [paramId('userId'), bodyId('installmentId'), bodyFloat('amount')];
}
