import { DataSource } from 'typeorm';
import {Respuesta } from './entities/respuesta.entity';
export const RespuestaProviders = [
  {
    provide: 'RESPUESTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Respuesta),
    inject: ['DATA_SOURCE'],
  },
];
