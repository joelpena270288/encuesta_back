import { DataSource } from 'typeorm';
import {Log } from './entities/log.entity';
export const LogProviders = [
  {
    provide: 'LOG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Log),
    inject: ['DATA_SOURCE'],
  },
];
