import 'dotenv/config';
import { DataSource } from 'typeorm';
import { logger } from '../services/logger-service';
import { ormConfig } from '../config/ormconfig';
import { DataSourceUtil } from '../utils/get-data-source';

const source: DataSource = new DataSource(ormConfig);

beforeAll(async () => {
  try {
    await source.initialize();
    DataSourceUtil.setDataSource(source);
  } catch (error) {
    logger.error(error);
  }
});

afterAll(async () => {
  await source.dropDatabase();
  await source.destroy();
});
