import { Module } from '@nestjs/common';
import { NotaCreditoService } from './nota_credito.service';
import { NotaCreditoController } from './nota_credito.controller';
import { DatabaseModule } from '../../database/database.module';
import { NotaCreditoProviders } from './nota_cretido.providers';

import { GastoEmpresaProviders } from '../gastos_empresas/gastos_empresas.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [NotaCreditoController],
  providers: [NotaCreditoService,...NotaCreditoProviders,...GastoEmpresaProviders],
  exports: [NotaCreditoService]
})
export class NotaCreditoModule {}
