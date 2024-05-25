import { Module } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { EncuestaController } from './encuesta.controller';
import {LogProviders} from '../log/log.providers';
import {EncuestaProviders} from './encuesta.providers';
import { DatabaseModule } from '../../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [EncuestaController],
  providers: [EncuestaService,...LogProviders,...EncuestaProviders],
  exports: [EncuestaService]
})
export class EncuestaModule {}
