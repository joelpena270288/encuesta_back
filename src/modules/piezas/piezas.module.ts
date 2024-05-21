import { Module } from '@nestjs/common';
import { PiezasService } from './piezas.service';
import { PiezasController } from './piezas.controller';
import { DatabaseModule } from '../../database/database.module';
import { PiezaProviders } from './piezas.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [PiezasController],
  providers: [PiezasService,...PiezaProviders],
  exports: [PiezasService],
})
export class PiezasModule {}
