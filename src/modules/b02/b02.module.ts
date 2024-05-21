import { Module } from '@nestjs/common';
import { B02Service } from './b02.service';
import { B02Controller } from './b02.controller';
import { DatabaseModule } from '../../database/database.module';
import { B02Providers } from './b02.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [B02Controller],
  providers: [B02Service,...B02Providers],
  exports: [B02Service],
})
export class B02Module {}
