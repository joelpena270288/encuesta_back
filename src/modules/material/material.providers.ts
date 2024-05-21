import { DataSource } from 'typeorm';
import {Material} from './entities/material.entity';
export const MaterialProviders = [
    {
        provide: 'MATERIAL_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Material),
        inject: ['DATA_SOURCE'],
    }
];