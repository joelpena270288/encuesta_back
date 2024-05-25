import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { DatabaseModule } from '../../database/database.module';
import {VentaProviders} from './venta.providers';
import {LogProviders} from '../log/log.providers';
import {VendedorProviders} from '../vendedor/vendedor.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [VentaController],
  providers: [VentaService,...VentaProviders,...LogProviders,...VendedorProviders],
  exports:[VentaService]
})
export class VentaModule {}
