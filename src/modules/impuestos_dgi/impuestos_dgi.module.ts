import { Module } from '@nestjs/common';
import { ImpuestosDgiService } from './impuestos_dgi.service';
import { ImpuestosDgiController } from './impuestos_dgi.controller';
import { DatabaseModule } from '../../database/database.module';
import { ImpuestoDgiProviders } from './impuesto_dgi.providers';
import { TipoImpuestoDgiImpuestoProviders } from '../tipo_impuestos_dgi/tipo_impuesto_dgi.providers';
import {CuentaEmpresaProviders } from '../cuentas-empresa/cuentas-empresa.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ImpuestosDgiController],
  providers: [ImpuestosDgiService,...ImpuestoDgiProviders,...TipoImpuestoDgiImpuestoProviders,...CuentaEmpresaProviders],
  exports:[ImpuestosDgiService],
})
export class ImpuestosDgiModule {}
