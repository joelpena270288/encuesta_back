import { Module } from '@nestjs/common';
import { CuestionarioService } from './cuestionario.service';
import { CuestionarioController } from './cuestionario.controller';

@Module({
  controllers: [CuestionarioController],
  providers: [CuestionarioService],
})
export class CuestionarioModule {}
