import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

if (!process.env.DB_HOST || !process.env.DB_USERNAME || !process.env.DB_PASS || !process.env.DB_NAME) {
  throw new Error('Make sure DB_HOST, DB_USERNAME, DB_PASS and DB_NAME environment variables are defined.');
}

if (
  !process.env.DEV_DB_HOST ||
  !process.env.DEV_DB_USERNAME ||
  !process.env.DEV_DB_PASS ||
  !process.env.DEV_DB_NAME
) {
  throw new Error(
    'Make sure DEV_DB_HOST, DEV_DB_USERNAME, DEV_DB_PASS and DEV_DB_NAME environment variables are defined.'
  );
}

const ormConfig: DataSourceOptions =
  process.env.NODE_ENV === 'production'
    ? {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: ['src/models/*.ts'],
        synchronize: true,
      }
    : {
        type: 'postgres',
        host: process.env.TEST_DB_HOST,
        port: 5432,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASS,
        database: process.env.TEST_DB_NAME,
        dropSchema: true,
        entities: ['src/models/*.ts'],
        synchronize: true,
      };

export { ormConfig };
