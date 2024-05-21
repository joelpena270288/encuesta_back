import { DataSource } from 'typeorm';
import { Conduce } from './entities/conduce.entity';
export const ConduceProviders = [
  {
    provide: 'CONDUCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Conduce),
    inject: ['DATA_SOURCE'],
  },
];
