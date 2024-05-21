import { DataSource } from 'typeorm';
import {Moneda} from './entities/moneda.entity';
export const MonedaProviders = [
    {
        provide: 'MONEDA_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Moneda),
        inject: ['DATA_SOURCE'],
    }
];