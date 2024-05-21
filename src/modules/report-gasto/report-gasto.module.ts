import { Module } from '@nestjs/common';
import { ReportGastoService } from './report-gasto.service';
import { ReportGastoController } from './report-gasto.controller';
import { GastoEmpresaProviders } from '../gastos_empresas/gastos_empresas.providers';

import { DatabaseModule } from '../../database/database.module';
import { EntradaCombustibleProviders } from '../entrada-combustible/entrada_combustible.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ReportGastoController],
  providers: [ReportGastoService,...GastoEmpresaProviders,...EntradaCombustibleProviders],
  exports:[ReportGastoService],
})
export class ReportGastoModule {}
