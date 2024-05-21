import { Module } from '@nestjs/common';
import { ReportCombustibleService } from './report-combustible.service';
import { ReportCombustibleController } from './report-combustible.controller';
import { DatabaseModule } from '../../database/database.module';
import { ConduceProviders } from '../conduce/conduce.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ReportCombustibleController],
  providers: [ReportCombustibleService,...ConduceProviders],
  exports: [ReportCombustibleService]
})
export class ReportCombustibleModule {}
