import express, { Router } from 'express';
import { CreditController } from '../controllers/credit';
import { CreditValidation } from '../validations/credit-validation';
import { validateRequest } from '../middlewares/validate-request';

const router: Router = express.Router();

router.post('/', [...CreditValidation.takeCredit, validateRequest], CreditController.takeCredit);

router.get(
  '/:userId/status',
  [...CreditValidation.getUserCreditByFilters, validateRequest],
  CreditController.getUserCreditByFilters
);

router.post(
  '/:userId/repay',
  [...CreditValidation.repayCreditInstallment, validateRequest],
  CreditController.repayCreditInstallment
);

export { router as creditRouter };
