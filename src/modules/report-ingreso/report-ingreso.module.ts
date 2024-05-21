import { Module } from '@nestjs/common';
import { ReportIngresoService } from './report-ingreso.service';
import { ReportIngresoController } from './report-ingreso.controller';
import { DatabaseModule } from '../../database/database.module';
import { FacturaProviders } from '../factura/factura.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportIngresoController],
  providers: [ReportIngresoService,...FacturaProviders],
  exports: [ReportIngresoService],
})
export class ReportIngresoModule {}
