import { Module } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { DatabaseModule } from '../../database/database.module';
import { MarcaProviders } from './marca.providers';
@Module({
  imports:[DatabaseModule],
  controllers: [MarcaController],
  providers: [MarcaService,...MarcaProviders],
  exports: [MarcaService]
})
export class MarcaModule {}
