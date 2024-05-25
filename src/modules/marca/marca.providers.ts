import { DataSource } from 'typeorm';
import {Marca } from './entities/marca.entity';

export const MarcaProviders = [
  {
    provide: 'MARCA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Marca),
    inject: ['DATA_SOURCE'],
  },
];
