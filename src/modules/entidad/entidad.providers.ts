import { DataSource } from 'typeorm';
import {Entidad } from './entities/entidad.entity';

export const EntidadProviders = [
  {
   
    provide: 'ENTIDAD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Entidad),
    inject: ['DATA_SOURCE'],
  },
];
