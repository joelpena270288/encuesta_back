import { Module } from '@nestjs/common';
import { ReporteEncuestaService } from './reporte-encuesta.service';
import { ReporteEncuestaController } from './reporte-encuesta.controller';
import { DatabaseModule } from '../../database/database.module';
import { VentaProviders } from '../venta/venta.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ReporteEncuestaController],
  providers: [ReporteEncuestaService,...VentaProviders],
  exports: [ReporteEncuestaService]
})
export class ReporteEncuestaModule {}
