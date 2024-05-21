import { DataSource } from 'typeorm';
import {Localidad} from './entities/localidad.entity';
export const LocalidadProviders = [
    {
        provide: 'LOCALIDAD_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(Localidad),
        inject: ['DATA_SOURCE'],
    }
];