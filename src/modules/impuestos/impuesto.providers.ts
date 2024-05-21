import { DataSource } from 'typeorm';
import { Impuesto } from './entities/impuesto.entity';
export const ImpuestoProviders = [
    {
        provide: 'IMPUESTO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Impuesto),
        inject: ['DATA_SOURCE'],
    }
];