import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { DatabaseModule } from '../../database/database.module';
import { ProyectoProviders } from './proyecto.providers';
import { ClienteProviders } from '../cliente/cliente.providers';
import { EmpresaProviders } from '../empresa/empresa.providers';
import { FacturaProviders } from '../factura/factura.providers';
import { ConduceProviders } from '../conduce/conduce.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ProyectoController],
  providers: [ProyectoService,...ProyectoProviders,...ClienteProviders,...EmpresaProviders,...FacturaProviders,...ConduceProviders],
  exports: [ProyectoService],
})
export class ProyectoModule {}
