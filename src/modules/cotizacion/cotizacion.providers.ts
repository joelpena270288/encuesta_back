import { DataSource } from 'typeorm';
import { Cotizacion} from './entities/cotizacion.entity';
export const CotizacionProviders = [
  {
    provide: 'COTIZACION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cotizacion),
    inject: ['DATA_SOURCE'],
  },
];
