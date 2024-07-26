import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { DatabaseModule } from '../../database/database.module';
import {VentaProviders} from './venta.providers';
import {LogProviders} from '../log/log.providers';
import {VendedorProviders} from '../vendedor/vendedor.providers';
import {EncuestaProviders} from '../encuesta/encuesta.providers';
import { ModeloProviders } from '../modelo/modelo.providers';
import { UserProviders } from '../users/user.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [VentaController],
  providers: [VentaService,...VentaProviders,...LogProviders,...VendedorProviders,...EncuestaProviders,...ModeloProviders,...UserProviders],
  exports:[VentaService]
})
export class VentaModule {}
