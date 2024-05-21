import { Module } from '@nestjs/common';
import { RetencionService } from './retencion.service';
import { RetencionController } from './retencion.controller';
import { DatabaseModule } from '../../database/database.module';
import { RetencionProviders } from './retencion.providers';
import { GastoEmpresaProviders } from '../gastos_empresas/gastos_empresas.providers';
import { FacturaProviders } from '../factura/factura.providers';
import { GastoItemProviders } from '../gasto_item/gasto_item.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [RetencionController],
  providers: [RetencionService,...RetencionProviders,...GastoEmpresaProviders,...FacturaProviders,...GastoItemProviders],
  exports: [RetencionService],
})
export class RetencionModule {}
