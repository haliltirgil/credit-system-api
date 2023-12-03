import express from 'express';
import { sampleRouter } from './sample';

const router = express.Router();

router.use('/samples', sampleRouter);

export { router };
