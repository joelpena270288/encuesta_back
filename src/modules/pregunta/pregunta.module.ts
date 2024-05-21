import { Module } from '@nestjs/common';
import { PreguntaService } from './pregunta.service';
import { PreguntaController } from './pregunta.controller';

@Module({
  controllers: [PreguntaController],
  providers: [PreguntaService],
})
export class PreguntaModule {}
