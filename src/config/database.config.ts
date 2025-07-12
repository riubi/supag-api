import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(
      process.env.DB_HOST,
      process.env.DB_PORT,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      process.env.DB_NAME
    );
    return {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      ...(process.env.PG_SSL === 'true' && { ssl: true }),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'supag_dev',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.js,.ts}'], 
      synchronize: false,
      schema: 'public',
      migrationsTableName: 'migrations',
      // migrationsRun: false,
      // logging: process.env.NODE_ENV === 'development',
      logging: false,
    };
  }
}