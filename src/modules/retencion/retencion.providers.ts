import { DataSource } from 'typeorm';
import {Retencion} from './entities/retencion.entity';
export const RetencionProviders = [
        {
        provide: 'RETENCION_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Retencion),
        inject: ['DATA_SOURCE'],
    }
];