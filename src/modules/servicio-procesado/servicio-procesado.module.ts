import { Module } from '@nestjs/common';
import { ServicioProcesadoService } from './servicio-procesado.service';
import { ServicioProcesadoController } from './servicio-procesado.controller';
import { DatabaseModule } from '../../database/database.module';
import { ServicioProcesadoProviders } from './servicio-procesado.providers';
import { PreFacturaProviders } from '../pre-factura/pre-factura.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [ServicioProcesadoController],
  providers: [ServicioProcesadoService,...ServicioProcesadoProviders,...PreFacturaProviders],
})
export class ServicioProcesadoModule {}
