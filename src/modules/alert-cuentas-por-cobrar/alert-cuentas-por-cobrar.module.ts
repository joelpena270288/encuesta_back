import { Module } from '@nestjs/common';
import { AlertCuentasPorCobrarService } from './alert-cuentas-por-cobrar.service';
import { AlertCuentasPorCobrarController } from './alert-cuentas-por-cobrar.controller';
import { DatabaseModule } from '../../database/database.module';
import { FacturaProviders } from '../factura/factura.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AlertCuentasPorCobrarController],
  providers: [AlertCuentasPorCobrarService,...FacturaProviders],
  exports: [AlertCuentasPorCobrarService]
})
export class AlertCuentasPorCobrarModule {}
