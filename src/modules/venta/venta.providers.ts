import { DataSource } from 'typeorm';
import {Venta } from './entities/venta.entity';
export const VentaProviders = [
  {
    provide: 'VENTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Venta),
    inject: ['DATA_SOURCE'],
  },
];
