import express, { Router } from 'express';
import { UserController } from '../controllers/user';

const router: Router = express.Router();

router.post('/', UserController.createUser);

export { router as userRouter };
