import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { DatabaseModule } from '../../database/database.module';
import { InventarioProviders } from './inventario.providers';
import { EquipoProviders } from '../equipos/equipos.providers';
import { PiezaProviders } from '../piezas/piezas.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InventarioController],
  providers: [InventarioService,...InventarioProviders,...EquipoProviders,...PiezaProviders],
  exports: [InventarioService],
})
export class InventarioModule {}
