import { Module } from '@nestjs/common';
import { CuestionarioService } from './cuestionario.service';
import { CuestionarioController } from './cuestionario.controller';
import { DatabaseModule } from '../../database/database.module';
import {CuestionarioProviders} from './cuestionario.providers';
import {EncuestaProviders} from '../encuesta/encuesta.providers';
import {LogProviders} from '../log/log.providers';
import {VentaProviders} from '../venta/venta.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [CuestionarioController],
  providers: [CuestionarioService,...CuestionarioProviders,...EncuestaProviders,...LogProviders,...VentaProviders],
  exports: [CuestionarioService]
})
export class CuestionarioModule {}
