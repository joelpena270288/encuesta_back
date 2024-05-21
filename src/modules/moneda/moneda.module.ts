import { Module } from '@nestjs/common';
import { MonedaService } from './moneda.service';
import { MonedaController } from './moneda.controller';
import { DatabaseModule } from '../../database/database.module';
import { MonedaProviders } from './moneda.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [MonedaController],
  providers: [MonedaService,...MonedaProviders],
})
export class MonedaModule {}
