import { DataSource } from 'typeorm';
import { Servicio } from './entities/servicio.entity';
export const ServicioProviders = [
    {
        provide: 'SERVICIO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Servicio),
        inject: ['DATA_SOURCE'],
    }
];