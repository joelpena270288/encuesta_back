import { DataSource } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
export const InventarioProviders = [
    {
        provide: 'INVENTARIO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Inventario),
        inject: ['DATA_SOURCE'],
    }
];