import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

const testOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['src/models/*.ts'],
  synchronize: true,
};

export { testOrmConfig };
