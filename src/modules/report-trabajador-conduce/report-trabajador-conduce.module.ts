import { Module } from '@nestjs/common';
import { ReportTrabajadorConduceService } from './report-trabajador-conduce.service';
import { ReportTrabajadorConduceController } from './report-trabajador-conduce.controller';
import { DatabaseModule } from '../../database/database.module';
import { ConduceProviders } from '../conduce/conduce.providers';
@Module({
 
    imports: [DatabaseModule],
  controllers: [ReportTrabajadorConduceController],
  providers: [ReportTrabajadorConduceService,...ConduceProviders],
  exports: [ReportTrabajadorConduceService],
  
})
export class ReportTrabajadorConduceModule {}
