import 'dotenv/config';
import { app } from './app';
import { DatabaseService } from './services/database-service';
import { logger } from './services/logger-service';
import { CronService } from './services/cron-service';
import { DataSourceUtil } from './utils/get-data-source';

const PORT = process.env.PORT ?? 4000;

const start = async () => {
  const dbService = new DatabaseService();
  await dbService.initialize();

  DataSourceUtil.setDataSource(dbService.source);

  CronService.dailyJob();

  app.listen(PORT, () => {
    logger.info(`Initialization successful -> Listening on port ${PORT}!`);
  });
};

start();
