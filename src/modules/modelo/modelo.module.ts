import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { DatabaseModule } from '../../database/database.module';
import { ModeloProviders } from './modelo.providers';
import { LogProviders } from '../log/log.providers';
import { MarcaProviders } from '../marca/marca.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ModeloController],
  providers: [ModeloService,...ModeloProviders,...LogProviders,...MarcaProviders],
  exports:[ModeloService]
})
export class ModeloModule {}
