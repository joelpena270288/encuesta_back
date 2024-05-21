import { DataSource } from 'typeorm';
import {Vendedor } from './entities/vendedor.entity';
export const VendedorProviders = [
  {
    provide: 'VENDEDOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vendedor),
    inject: ['DATA_SOURCE'],
  },
];
