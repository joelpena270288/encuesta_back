import { Module } from '@nestjs/common';
import { Report07Service } from './report-07.service';
import { Report07Controller } from './report-07.controller';
import { DatabaseModule } from '../../database/database.module';
import { FacturaProviders } from '../factura/factura.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [Report07Controller],
  providers: [Report07Service,...FacturaProviders],
  exports:[Report07Service]
})
export class Report07Module {}
