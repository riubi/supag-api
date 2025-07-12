import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfig } from './database.config';

console.debug('Migrations datasource');
const databaseConfig = new DatabaseConfig();
const AppDataSource = new DataSource(databaseConfig.createTypeOrmOptions() as DataSourceOptions);

export default AppDataSource;