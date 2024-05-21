import { DataSource } from 'typeorm';
import {NotaCredito} from './entities/nota_credito.entity';
export const NotaCreditoProviders = [
    {
        provide: 'NOTACREDITO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(NotaCredito),
        inject: ['DATA_SOURCE'],
    }
];