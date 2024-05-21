import { DataSource } from 'typeorm';
import { B11 } from './entities/b11.entity';
export const B11Providers = [
  {
    provide: 'B11_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(B11),
    inject: ['DATA_SOURCE'],
  },
];
