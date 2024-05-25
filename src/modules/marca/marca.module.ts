import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { DatabaseModule } from '../../database/database.module';
import { MarcaProviders } from './marca.providers';
import { LogProviders } from '../log/log.providers';
@Module({
  imports: [DatabaseModule],
  controllers:[MarcaController],
  providers: [MarcaService,...MarcaProviders,...LogProviders],
  exports: [MarcaService]
})
export class MarcaModule {}
