import { Module } from '@nestjs/common';
import { PagoGastoService } from './pago-gasto.service';
import { PagoGastoController } from './pago-gasto.controller';
import { CuentaEmpresaProviders } from '../cuentas-empresa/cuentas-empresa.providers';
import { DatabaseModule } from '../../database/database.module';
import { PagoGastoProviders } from './pago-gasto.providers';
import { GastoEmpresaProviders } from '../gastos_empresas/gastos_empresas.providers';
import { MonedaProviders } from '../moneda/moneda.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PagoGastoController],
  providers: [PagoGastoService,...PagoGastoProviders, ...GastoEmpresaProviders, ...CuentaEmpresaProviders,...MonedaProviders],
  exports:[PagoGastoService],
})
export class PagoGastoModule {}
