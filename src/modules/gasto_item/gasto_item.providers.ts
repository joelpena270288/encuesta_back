import { DataSource } from 'typeorm';
import { GastoItem } from './entities/gasto_item.entity';
export const GastoItemProviders = [
    {
        provide: 'GASTOITEM_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(GastoItem),
        inject: ['DATA_SOURCE'],
    }
];