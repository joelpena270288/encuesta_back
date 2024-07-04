import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CompetenciaService } from './competencia.service';
import { GenerarCompetencia } from './dto/generar-competencia.dto';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { RoleEnum } from '../role/enums/role.enum';


@Controller('competencia')
export class CompetenciaController {
  constructor(private readonly competenciaService: CompetenciaService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() generarCompetencia: GenerarCompetencia) {
    return this.competenciaService.create(generarCompetencia);
  }

 
}
