import { DataSource } from 'typeorm';
import {Combustible} from './entities/combustible.entity';
export const CombustibleProviders = [
    {
        provide: 'COMBUSTIBLE_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Combustible),
        inject: ['DATA_SOURCE'],
    }
];