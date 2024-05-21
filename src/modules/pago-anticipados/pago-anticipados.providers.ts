import { DataSource } from 'typeorm';
import {PagoAnticipado} from './entities/pago-anticipado.entity';
export const PagoAnticipadoProviders = [
    {
        provide: 'PAGOANTICIPADO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(PagoAnticipado),
        inject: ['DATA_SOURCE'],
    }
];