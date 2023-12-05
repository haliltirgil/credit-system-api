import { DataSource } from 'typeorm';

export class DataSourceUtil {
  static dataSource: DataSource;

  static getDataSource() {
    return this.dataSource;
  }

  static setDataSource(object: DataSource) {
    this.dataSource = object;
  }
}
