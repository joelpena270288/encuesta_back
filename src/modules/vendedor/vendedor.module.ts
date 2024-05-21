import { Module } from '@nestjs/common';
import { VendedorService } from './vendedor.service';
import { VendedorController } from './vendedor.controller';
import { DatabaseModule } from '../../database/database.module';
import { VendedorProviders } from './vendedor.providers';
import {LogProviders} from '../log/log.providers';
import {GrupoProviders} from '../grupo/grupo.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [VendedorController],
  providers: [VendedorService,...VendedorProviders,...LogProviders,...GrupoProviders],
  exports: [VendedorService]
})
export class VendedorModule {}
