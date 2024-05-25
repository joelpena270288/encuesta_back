import { DataSource } from 'typeorm';
import {Modelo } from './entities/modelo.entity';
export const ModeloProviders = [
  {
    provide: 'MODELO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Modelo),
    inject: ['DATA_SOURCE'],
  },
];
