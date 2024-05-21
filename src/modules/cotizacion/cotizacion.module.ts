import { Module } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CotizacionController } from './cotizacion.controller';
import { DatabaseModule } from '../../database/database.module';
import { CotizacionProviders } from './cotizacion.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { PreFacturaProviders } from '../pre-factura/marca.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CotizacionController],
  providers: [CotizacionService,...CotizacionProviders,...ProyectoProviders,...PreFacturaProviders],
  exports: [CotizacionService],
})
export class CotizacionModule {}
