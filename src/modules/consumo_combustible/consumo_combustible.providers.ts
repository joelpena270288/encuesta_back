import { DataSource } from 'typeorm';
import { ConsumoCombustible} from './entities/consumo_combustible.entity';
export const ConsumoCombustibleProviders = [
  {
    provide: 'CONSUMOCOMBUSTIBLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ConsumoCombustible),
    inject: ['DATA_SOURCE'],
  },
];
