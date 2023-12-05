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

afterEach(async () => {
  await source.query(`CREATE OR REPLACE FUNCTION truncate_tables(username IN VARCHAR) RETURNS void AS $$
  DECLARE
      statements CURSOR FOR
          SELECT tablename FROM pg_tables
          WHERE tableowner = username AND schemaname = 'public';
  BEGIN
      FOR stmt IN statements LOOP
          EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' CASCADE;';
      END LOOP;
  END;
  $$ LANGUAGE plpgsql`);
  await source.query(`SELECT truncate_tables('MYUSER')`);
});

afterAll(async () => {
  await source.dropDatabase();
  await source.destroy();
});
