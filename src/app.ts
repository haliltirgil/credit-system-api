import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorLogger } from 'express-winston';
import { router } from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { logger, requestLogger } from './services/logger-service';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(json());

app.use(requestLogger);

app.use('/api/v1', router);

app.all('*', async (req: Request, res: Response) => {
  logger.error(`The requested path is not found.`, { req, res });
  throw new NotFoundError();
});

app.use(errorLogger);

app.use(errorHandler);

export { app };
