import { Module } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';

@Module({
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}
