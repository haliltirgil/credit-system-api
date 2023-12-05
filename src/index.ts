import 'dotenv/config';
import { app } from './app';
import { DatabaseService } from './services/database-service';
import { logger } from './services/logger-service';
import { CronService } from './services/cron-service';

const PORT = process.env.PORT ?? 4000;

const start = async () => {
  await new DatabaseService().initialize();

  CronService.dailyJob();

  app.listen(PORT, () => {
    logger.info(`Initialization successful -> Listening on port ${PORT}!`);
  });
};

start();
