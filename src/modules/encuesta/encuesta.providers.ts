import { DataSource } from 'typeorm';
import {Encuesta } from './entities/encuesta.entity';
export const EncuestaProviders = [
  {
    provide: 'ENCUESTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Encuesta),
    inject: ['DATA_SOURCE'],
  },
];
