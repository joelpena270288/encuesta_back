import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { DatabaseModule } from '../../database/database.module';
import {GrupoProviders } from './grupo.providers';
import {LogProviders} from '../log/log.providers';
import {KpiProviders} from '../kpi/kpi.providers';
import { RangoDescuentoProviders } from './rango-descuesto.providers';
import { RangoEncuestaProviders } from './rango-encuesta.providers';
import { RangoVentaProviders } from './rango-venta.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [GrupoController],
  providers: [GrupoService, ...GrupoProviders,...LogProviders,...KpiProviders,...RangoDescuentoProviders,...RangoEncuestaProviders,...RangoVentaProviders],
  exports: [GrupoService]
})
export class GrupoModule {}
