import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Event } from './events/event.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'statstracker',
  entities: [Event],
  synchronize: true,
  logging: true,
};