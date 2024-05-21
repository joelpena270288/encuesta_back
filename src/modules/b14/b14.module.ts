import { Module } from '@nestjs/common';
import { B14Service } from './b14.service';
import { B14Controller } from './b14.controller';
import { DatabaseModule } from '../../database/database.module';
import { B14Providers } from './b14.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [B14Controller],
  providers: [B14Service,...B14Providers],
  exports: [B14Service],
})
export class B14Module {}
