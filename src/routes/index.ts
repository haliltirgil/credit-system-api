import express, { Router } from 'express';
import { userRouter } from './user';
import { creditRouter } from './credit';

const router: Router = express.Router();

router.use('/users', userRouter);

router.use('/credits', creditRouter);

export { router };
