import { DataSource } from 'typeorm';
import {Color } from './entities/color.entity';
export const ColorProviders = [
  {
    provide: 'COLOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Color),
    inject: ['DATA_SOURCE'],
  },
];
