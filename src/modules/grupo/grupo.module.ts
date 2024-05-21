import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { DatabaseModule } from '../../database/database.module';
import {GrupoProviders } from './grupo.providers';
import {LogProviders} from '../log/log.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [GrupoController],
  providers: [GrupoService, ...GrupoProviders,...LogProviders],
  exports: [GrupoService]
})
export class GrupoModule {}
