import winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';
import { errorLogger as errorLoggerFunction, logger as requestLoggerFunction } from 'express-winston';

const logger = winston.createLogger({
  level: 'info',
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    process.env.NODE_ENV === 'production'
      ? new winston.transports.Console()
      : new winston.transports.File({ filename: './app.log' }),
  ],
});

const errorLogger = errorLoggerFunction({
  winstonInstance: logger,
  format: ecsFormat({ convertReqRes: true }),
});

const requestLogger = requestLoggerFunction({
  winstonInstance: logger,
  format: ecsFormat({ convertReqRes: true }),
  msg: 'HTTP {{req.method}} {{res.statusCode}} {{req.url}} - {{res.responseTime}}ms',
});

export { logger, errorLogger, requestLogger };
