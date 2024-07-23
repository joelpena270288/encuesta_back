import { DataSource } from 'typeorm';
import {RangoEncuesta } from './entities/rango-encuesta.entity';
export const RangoEncuestaProviders = [
  {
    provide: 'RANGODENCUESTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RangoEncuesta),
    inject: ['DATA_SOURCE'],
  },
];
