import { DataSource } from 'typeorm';
import { ormConfig } from '../config/ormconfig';

export class DatabaseService {
  source: DataSource;

  constructor() {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    require('dotenv').config();
    this.source = new DataSource(ormConfig);
  }

  public async initialize() {
    await this.source.initialize();
  }

  public async destroy() {
    await this.source.destroy();
  }

  public async getSource() {
    return this.source;
  }
}
