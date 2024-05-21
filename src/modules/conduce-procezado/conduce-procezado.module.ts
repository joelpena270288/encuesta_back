import { Module } from '@nestjs/common';
import { ConduceProcezadoService } from './conduce-procezado.service';
import { ConduceProcezadoController } from './conduce-procezado.controller';
import { ConduceProcezadoProviders } from './conduce-procezado.providers';
import { ConduceProviders } from '../conduce/conduce.providers';
import { DatabaseModule } from '../../database/database.module';
import {ProyectoProviders} from '../proyecto/proyecto.providers';
import { PreFacturaProviders } from '../pre-factura/pre-factura.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ConduceProcezadoController],
  providers: [ConduceProcezadoService,...ConduceProcezadoProviders,...ConduceProviders,...ProyectoProviders,...PreFacturaProviders],
  
})
export class ConduceProcezadoModule {}
