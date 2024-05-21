import { DataSource } from 'typeorm';
import {PagoGasto} from './entities/pago-gasto.entity';
export const PagoGastoProviders = [
    {
        provide: 'PAGOGASTO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(PagoGasto),
        inject: ['DATA_SOURCE'],
    }
];