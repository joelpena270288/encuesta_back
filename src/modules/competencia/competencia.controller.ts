import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import { GenerarCompetencia } from './dto/generar-competencia.dto';


@Controller('competencia')
export class CompetenciaController {
  constructor(private readonly competenciaService: CompetenciaService) {}

  @Post()
  create(@Body() generarCompetencia: GenerarCompetencia) {
    return this.competenciaService.create(generarCompetencia);
  }

 
}
