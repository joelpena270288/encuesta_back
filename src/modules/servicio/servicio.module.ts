import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { ServicioProviders } from './servicio.providers';

import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [ServicioController],
  imports: [DatabaseModule],
  providers: [ServicioService, ...ServicioProviders],
  exports:[ServicioService]
})
export class ServicioModule {}
