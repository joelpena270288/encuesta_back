import { Module } from '@nestjs/common';
import { B01Service } from './b01.service';
import { B01Controller } from './b01.controller';
import { DatabaseModule } from '../../database/database.module';
import { B01Providers } from './b01.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [B01Controller],
  providers: [B01Service,...B01Providers],
  exports: [B01Service],
})
export class B01Module {}
