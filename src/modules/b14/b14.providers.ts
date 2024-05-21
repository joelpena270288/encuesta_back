import { DataSource } from 'typeorm';
import { B14 } from './entities/b14.entity';
export const B14Providers = [
  {
    provide: 'B14_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(B14),
    inject: ['DATA_SOURCE'],
  },
];
