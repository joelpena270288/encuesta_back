import { DataSource } from 'typeorm';

import { EntradaCombustible } from './entities/entrada-combustible.entity';
export const EntradaCombustibleProviders = [
  {
    provide: 'ENTRADACOMBUSTIBLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EntradaCombustible),
    inject: ['DATA_SOURCE'],
  },
];
