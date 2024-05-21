import { DataSource } from 'typeorm';
import { TipoEquipo} from './entities/tipo_equipo.entity';
export const TipoEquipoProviders = [
    {
        provide: 'TIPOEQUIPO_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(TipoEquipo),
        inject: ['DATA_SOURCE'],
    }
];