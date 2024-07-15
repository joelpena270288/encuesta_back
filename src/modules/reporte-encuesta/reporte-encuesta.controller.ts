import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReporteEncuestaService } from './reporte-encuesta.service';
import { CreateReporteEncuestaDto } from './dto/create-reporte-encuesta.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';


@Controller('reporte-encuesta')
export class ReporteEncuestaController {
  constructor(private readonly reporteEncuestaService: ReporteEncuestaService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createReporteEncuestaDto: CreateReporteEncuestaDto) {
    return this.reporteEncuestaService.create(createReporteEncuestaDto);
  }


}
