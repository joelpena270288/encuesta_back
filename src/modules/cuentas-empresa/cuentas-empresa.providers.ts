import { DataSource } from 'typeorm';

import { CuentasEmpresa } from './entities/cuentas-empresa.entity';
export const CuentaEmpresaProviders = [
  {
    provide: 'CUENTAEMPRESA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CuentasEmpresa),
    inject: ['DATA_SOURCE'],
  },
];
