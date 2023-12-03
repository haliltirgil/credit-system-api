import express, { Router } from 'express';
import { CreditController } from '../controllers/credit';

const router: Router = express.Router();

router.post('/', CreditController.takeCredit);

router.get('/:userId/status', CreditController.getUserCreditByStatus);

router.post('/:userId/repay', CreditController.repayCreditInstallment);

export { router as creditRouter };
