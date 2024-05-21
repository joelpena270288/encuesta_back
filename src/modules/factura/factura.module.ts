import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { DatabaseModule } from '../../database/database.module';
import { FacturaProviders } from './factura.providers';
import {ProyectoProviders} from '../proyecto/proyecto.providers';
import { PreFacturaProviders } from '../pre-factura/pre-factura.providers';
import { ServicioProcesadoProviders } from '../servicio-procesado/servicio-procesado.providers';
import { ClienteProviders } from '../cliente/cliente.providers';
import { B01Providers } from '../b01/b01.providers';
import { B02Providers } from '../b02/b02.providers';
import { B14Providers } from '../b14/b14.providers';
import {MonedaProviders} from '../moneda/moneda.providers';
@Module({
	imports: [DatabaseModule],
  controllers: [FacturaController],
  providers: [FacturaService,...FacturaProviders,...ProyectoProviders,...ServicioProcesadoProviders,...PreFacturaProviders,...ClienteProviders,...B01Providers,...B02Providers,...B14Providers,...MonedaProviders],
  exports:[FacturaService]
})
export class FacturaModule {}
