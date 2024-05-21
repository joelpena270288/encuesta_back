import { DataSource } from 'typeorm';
import { B01 } from './entities/b01.entity';
export const B01Providers = [
  {
    provide: 'B01_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(B01),
    inject: ['DATA_SOURCE'],
  },
];
