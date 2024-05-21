import { Module } from '@nestjs/common';
import { EquiposService } from './equipos.service';
import { EquiposController } from './equipos.controller';
import { DatabaseModule } from '../../database/database.module';
import { EquipoProviders } from './equipos.providers';
import { MarcaProviders } from '../marca/marca.providers';
import {TipoEquipoProviders} from '../tipo_equipo/tipo_equipo.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [EquiposController],
  providers: [EquiposService,...EquipoProviders,...MarcaProviders,...TipoEquipoProviders],
  exports: [EquiposService],
})
export class EquiposModule {}
