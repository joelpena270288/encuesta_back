import { Module } from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import { CompetenciaController } from './competencia.controller';
import {VendedorProviders} from '../vendedor/vendedor.providers';
import {KpiProviders} from '../kpi/kpi.providers';
import { DatabaseModule } from '../../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [CompetenciaController],
  providers: [CompetenciaService,...VendedorProviders,...KpiProviders],
})
export class CompetenciaModule {}
