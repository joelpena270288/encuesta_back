import { Module } from '@nestjs/common';
import { ProvedorService } from './provedor.service';
import { ProvedorController } from './provedor.controller';
import { DatabaseModule } from '../../database/database.module';

import { ProvedorProviders } from './provedor.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [ProvedorController],
  providers: [ProvedorService,...ProvedorProviders],
  exports: [ProvedorService],
})
export class ProvedorModule {}
