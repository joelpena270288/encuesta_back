import { Module } from '@nestjs/common';
import { ConsumoCombustibleService } from './consumo_combustible.service';
import { ConsumoCombustibleController } from './consumo_combustible.controller';
import { DatabaseModule } from '../../database/database.module';
import { ConsumoCombustibleProviders } from './consumo_combustible.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { CombustibleProviders } from '../combustible/combustible.providers';
import { EquipoProviders } from '../equipos/equipos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsumoCombustibleController],
  providers: [ConsumoCombustibleService,...ConsumoCombustibleProviders,...ProyectoProviders,...CombustibleProviders,...EquipoProviders],
  exports: [ConsumoCombustibleService],
})
export class ConsumoCombustibleModule {}
