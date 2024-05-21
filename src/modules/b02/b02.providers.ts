import { DataSource } from 'typeorm';
import { B02 } from './entities/b02.entity';
export const B02Providers = [
  {
    provide: 'B02_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(B02),
    inject: ['DATA_SOURCE'],
  },
];
