import express from 'express';
import { SampleController } from '../controllers/sample';

const router = express.Router();

router.get('/', SampleController.getSamples);

export { router as sampleRouter };
