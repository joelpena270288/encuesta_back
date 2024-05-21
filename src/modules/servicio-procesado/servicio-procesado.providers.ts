import { DataSource } from 'typeorm';
import {ServicioProcesado} from './entities/servicio-procesado.entity';
export const ServicioProcesadoProviders = [
    {
        provide: 'SERVICIOPROCESADO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(ServicioProcesado),
        inject: ['DATA_SOURCE'],
    }
];