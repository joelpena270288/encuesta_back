import { Module } from '@nestjs/common';
import { B11Service } from './b11.service';
import { B11Controller } from './b11.controller';
import { DatabaseModule } from '../../database/database.module';
import { B11Providers } from './b11.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [B11Controller],
  providers: [B11Service,...B11Providers],
  exports: [B11Service],
})
export class B11Module {}
