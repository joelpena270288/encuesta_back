import { DataSource } from 'typeorm';
import { ImpuestosDgi } from './entities/impuestos_dgi.entity';
export const ImpuestoDgiProviders = [
    {
        provide: 'IMPUESTODGI_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(ImpuestosDgi),
        inject: ['DATA_SOURCE'],
    }
];