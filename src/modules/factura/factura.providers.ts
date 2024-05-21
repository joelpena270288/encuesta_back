import { DataSource } from 'typeorm';
import { Factura } from './entities/factura.entity';
export const FacturaProviders = [
    {
        provide: 'FACTURA_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Factura),
        inject: ['DATA_SOURCE'],
    }
];