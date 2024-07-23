import { DataSource } from 'typeorm';
import {RangoVenta } from './entities/rango-venta.entity';
export const RangoVentaProviders = [
  {
    provide: 'RANGOVENTA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RangoVenta),
    inject: ['DATA_SOURCE'],
  },
];
