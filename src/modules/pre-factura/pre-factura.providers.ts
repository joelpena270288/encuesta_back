import { DataSource } from 'typeorm';
import {PreFactura} from './entities/pre-factura.entity';
export const PreFacturaProviders = [
    {
        provide: 'PREFACTURA_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(PreFactura),
        inject: ['DATA_SOURCE'],
    }
];