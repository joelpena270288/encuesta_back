import { Module } from '@nestjs/common';
import { PagoFacturaService } from './pago-factura.service';
import { PagoFacturaController } from './pago-factura.controller';
import { DatabaseModule } from '../../database/database.module';
import { PagoFacturaProviders } from './pago-factura.providers';
import { FacturaProviders } from '../factura/factura.providers';
import { CuentaEmpresaProviders } from '../cuentas-empresa/cuentas-empresa.providers';
import { PagoAnticipadoProviders } from '../pago-anticipados/pago-anticipados.providers';
import { ClienteProviders } from '../cliente/cliente.providers';
import { MonedaProviders } from '../moneda/moneda.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [PagoFacturaController],
  providers: [PagoFacturaService,...PagoFacturaProviders, ...FacturaProviders,...CuentaEmpresaProviders,...PagoAnticipadoProviders,...ClienteProviders,...PagoAnticipadoProviders,...MonedaProviders],
  exports: [PagoFacturaService]
})
export class PagoFacturaModule {}
