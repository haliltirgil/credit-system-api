import 'dotenv/config';
import { DataSource } from 'typeorm';
import { logger } from '../services/logger-service';
import { testOrmConfig } from '../config/test-ormconfig';

const source: DataSource = new DataSource(testOrmConfig);

beforeAll(async () => {
  try {
    await source.initialize();
    console.log('im here');
  } catch (error) {
    logger.error(error);
  }
});

afterAll(async () => {
  await source.dropDatabase();
  await source.destroy();
});
