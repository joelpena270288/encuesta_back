import { DataSource } from 'typeorm';
import { GastosEmpresa } from './entities/gastos_empresa.entity';
export const GastoEmpresaProviders = [
    {
        provide: 'GASTOEMPRESA_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(GastosEmpresa),
        inject: ['DATA_SOURCE'],
    }
];