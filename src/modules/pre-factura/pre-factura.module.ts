import { Module } from '@nestjs/common';
import { PreFacturaService } from './pre-factura.service';
import { PreFacturaController } from './pre-factura.controller';
import { DatabaseModule } from '../../database/database.module';
import { PreFacturaProviders } from './pre-factura.providers';
import { FacturaProviders } from '../factura/factura.providers';
@Module({
   imports: [DatabaseModule],
  controllers: [PreFacturaController],
  providers: [PreFacturaService,...PreFacturaProviders,...FacturaProviders],
})
export class PreFacturaModule {}
