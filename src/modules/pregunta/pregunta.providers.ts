import { DataSource } from 'typeorm';
import {Pregunta } from './entities/pregunta.entity';
export const PreguntaProviders = [
  {
    provide: 'PREGUNTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pregunta),
    inject: ['DATA_SOURCE'],
  },
];
