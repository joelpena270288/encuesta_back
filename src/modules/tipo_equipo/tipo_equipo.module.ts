import { Module } from '@nestjs/common';
import { TipoEquipoService } from './tipo_equipo.service';
import { TipoEquipoController } from './tipo_equipo.controller';
import { DatabaseModule } from '../../database/database.module';
import { TipoEquipoProviders } from './tipo_equipo.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TipoEquipoController],
  providers: [TipoEquipoService, ...TipoEquipoProviders],
  exports: [TipoEquipoService]
})
export class TipoEquipoModule {}
