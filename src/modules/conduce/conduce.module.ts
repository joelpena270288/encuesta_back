import { Module } from '@nestjs/common';
import { ConduceService } from './conduce.service';
import { ConduceController } from './conduce.controller';
import { DatabaseModule } from '../../database/database.module';
import { ConduceProviders } from './conduce.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { ClienteProviders } from '../cliente/cliente.providers';
import { EquipoProviders } from '../equipos/equipos.providers';
import { MaterialProviders } from '../material/material.providers';
import { ServicioProviders } from '../servicio/servicio.providers';
import { EmpleadoProviders } from '../empleado/empleado.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ConduceController],
  providers: [ConduceService,...ConduceProviders,...ClienteProviders,...ProyectoProviders,...EquipoProviders,...MaterialProviders,...ServicioProviders,...EmpleadoProviders],
  exports: [ConduceService]
})
export class ConduceModule {}
