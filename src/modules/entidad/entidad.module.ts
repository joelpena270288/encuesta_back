import { Module } from '@nestjs/common';
import { EntidadService } from './entidad.service';
import { EntidadController } from './entidad.controller';
import { DatabaseModule } from '../../database/database.module';
import { EntidadProviders } from './entidad.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [EntidadController],
  providers: [EntidadService,...EntidadProviders],
  exports: [EntidadService],
})
export class EntidadModule {}
