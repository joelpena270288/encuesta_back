import { Module } from '@nestjs/common';
import { ReportVentasService } from './report-ventas.service';
import { ReportVentasController } from './report-ventas.controller';
import { DatabaseModule } from '../../database/database.module';
import { VentaProviders } from '../venta/venta.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReportVentasController],
  providers: [ReportVentasService,...VentaProviders],
  exports: [ReportVentasService]
})
export class ReportVentasModule {}
