import { Module } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { LocalidadesController } from './localidades.controller';
import { LocalidadProviders } from './localidad.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LocalidadesController],
  providers: [LocalidadesService ,...LocalidadProviders],
  exports: [LocalidadesService]
})
export class LocalidadesModule {}
