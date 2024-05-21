import { DataSource } from 'typeorm';
import {Cuestionario } from './entities/cuestionario.entity';
export const CuestionarioProviders = [
  {
    provide: 'CUESTIONARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cuestionario),
    inject: ['DATA_SOURCE'],
  },
];
