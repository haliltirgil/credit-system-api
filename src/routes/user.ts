import express, { Router } from 'express';
import { UserController } from '../controllers/user';

const router: Router = express.Router();

router.post('/', UserController.createUser);

router.get('/:userId/credits', UserController.getUserCredits);

export { router as userRouter };
