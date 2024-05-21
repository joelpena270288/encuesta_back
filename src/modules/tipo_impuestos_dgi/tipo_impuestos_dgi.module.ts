import { Module } from '@nestjs/common';
import { TipoImpuestosDgiService } from './tipo_impuestos_dgi.service';
import { TipoImpuestosDgiController } from './tipo_impuestos_dgi.controller';
import { DatabaseModule } from '../../database/database.module';
import { TipoImpuestoDgiImpuestoProviders } from './tipo_impuesto_dgi.providers';
import { EntidadProviders } from '../entidad/entidad.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [TipoImpuestosDgiController],
  providers: [TipoImpuestosDgiService,...TipoImpuestoDgiImpuestoProviders,...EntidadProviders],
  exports:[TipoImpuestosDgiService]
})
export class TipoImpuestosDgiModule {}
