import 'dotenv/config';
import { DataSource, getConnection } from 'typeorm';
import { logger } from '../services/logger-service';
import { ormConfig } from '../config/ormconfig';
import { setupDataSource } from './test-setup';

const source: DataSource = new DataSource(ormConfig);

beforeAll(async () => {
  try {
    await setupDataSource();
    // console.log('sa');
    // await source.initialize();
  } catch (error) {
    logger.error(error);
  }
});

afterAll(async () => {
  await source.dropDatabase();
  await source.destroy();
});
