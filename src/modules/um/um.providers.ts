import { DataSource } from 'typeorm';
import { Um } from './entities/um.entity';
export const UmProviders = [
    {
        provide: 'UM_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Um),
        inject: ['DATA_SOURCE'],
    }
];