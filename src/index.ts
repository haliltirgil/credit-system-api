import 'dotenv/config';
import { app } from './app';
import { DatabaseService } from './services/database-service';
import { logger } from './services/logger-service';

const PORT = process.env.PORT ?? 3000;

const start = async () => {
  await new DatabaseService().initialize();

  app.listen(PORT, () => {
    logger.info(`Initialization successful -> Listening on port ${PORT}!`);
  });
};

start();
