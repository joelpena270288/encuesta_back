import { DataSource } from 'typeorm';
import {PagoFactura} from './entities/pago-factura.entity';
export const PagoFacturaProviders = [
    {
        provide: 'PAGOFACTURA_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(PagoFactura),
        inject: ['DATA_SOURCE'],
    }
];