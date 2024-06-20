import { DataSource } from 'typeorm';
import {Kpi } from './entities/kpi.entity';
export const KpiProviders = [
  {
    provide: 'KPI_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Kpi),
    inject: ['DATA_SOURCE'],
  },
];
