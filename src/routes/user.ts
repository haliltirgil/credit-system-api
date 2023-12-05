import express, { Router } from 'express';
import { UserController } from '../controllers/user';
import { UserValidation } from '../validations/user-validation';
import { validateRequest } from '../middlewares/validate-request';

const router: Router = express.Router();

router.post('/', [...UserValidation.createUser, validateRequest], UserController.createUser);

router.get('/:userId/credits', [...UserValidation.getUserCredits, validateRequest], UserController.getUserCredits);

router.get('/', UserController.getUsers);

export { router as userRouter };
