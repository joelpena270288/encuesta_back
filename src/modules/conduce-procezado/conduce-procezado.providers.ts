import { DataSource } from 'typeorm';
import { ConduceProcezado } from './entities/conduce-procezado.entity';
export const ConduceProcezadoProviders = [
  {
    provide: 'CONDUCEPROCEZADO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ConduceProcezado),
    inject: ['DATA_SOURCE'],
  },
];
