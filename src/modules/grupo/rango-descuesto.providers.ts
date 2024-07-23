import { DataSource } from 'typeorm';
import {RangoDescuesto } from './entities/rango-descuesto.entity';
export const RangoDescuentoProviders = [
  {
    provide: 'RANGODESCUENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RangoDescuesto),
    inject: ['DATA_SOURCE'],
  },
];
