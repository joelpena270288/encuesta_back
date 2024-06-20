import { Module } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { KpiController } from './kpi.controller';
import { DatabaseModule } from '../../database/database.module';
import {LogProviders} from '../log/log.providers'
import { KpiProviders } from './kpi.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [KpiController],
  providers: [KpiService,...KpiProviders,...LogProviders],
  exports: [KpiService]
})
export class KpiModule {}
