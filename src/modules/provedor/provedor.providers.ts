import { DataSource } from 'typeorm';
import { Provedor } from './entities/provedor.entity';
export const ProvedorProviders = [
  {
    provide: 'PROVEDOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Provedor),
    inject: ['DATA_SOURCE'],
  },
];
