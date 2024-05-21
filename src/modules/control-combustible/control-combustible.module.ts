import { Module } from '@nestjs/common';
import { ControlCombustibleService } from './control-combustible.service';
import { ControlCombustibleController } from './control-combustible.controller';
import { DatabaseModule } from '../../database/database.module';

import { ConsumoCombustibleProviders } from '../consumo_combustible/consumo_combustible.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ControlCombustibleController],
  providers: [ControlCombustibleService,...ConsumoCombustibleProviders],
  exports: [ControlCombustibleService]
})
export class ControlCombustibleModule {}
