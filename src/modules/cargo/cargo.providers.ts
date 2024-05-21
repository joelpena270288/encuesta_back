import { DataSource } from 'typeorm';
import { Cargo } from './entities/cargo.entity';
export const CargoProviders = [
  {
    provide: 'CARGO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cargo),
    inject: ['DATA_SOURCE'],
  },
];
