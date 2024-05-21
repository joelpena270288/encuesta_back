import { Module } from '@nestjs/common';
import { ImpuestosService } from './impuestos.service';
import { ImpuestosController } from './impuestos.controller';
import { ImpuestoProviders } from './impuesto.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ImpuestosController],
  providers: [ImpuestosService,...ImpuestoProviders],
  exports: [ImpuestosService]
})
export class ImpuestosModule {}
