import { DataSource } from 'typeorm';
import { TipoImpuestosDgi } from './entities/tipo_impuestos_dgi.entity';
export const TipoImpuestoDgiImpuestoProviders = [
    {
        provide: 'TIPOIMPUESTODGI_REPOSITORY',
        useFactory: (dataSource: DataSource)=>dataSource.getRepository(TipoImpuestosDgi),
        inject: ['DATA_SOURCE'],
    }
];