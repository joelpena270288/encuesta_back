import { DataSource } from 'typeorm';
import {Grupo } from './entities/grupo.entity';
export const GrupoProviders = [
  {
    provide: 'GRUPO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Grupo),
    inject: ['DATA_SOURCE'],
  },
];
