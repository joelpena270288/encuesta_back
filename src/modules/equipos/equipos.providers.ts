import { DataSource } from 'typeorm';
import { Equipo } from './entities/equipo.entity';

export const EquipoProviders = [
    {
        provide: 'EQUIPO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Equipo),
        inject: ['DATA_SOURCE'],
    }
];