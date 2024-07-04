import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportVentasService } from './report-ventas.service';
import {FiltroFechaDto } from '../../filtro-fecha/filtro-fecha.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('report-ventas')
export class ReportVentasController {
  constructor(private readonly reportVentasService: ReportVentasService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() filter: FiltroFechaDto) {
    return this.reportVentasService.create(filter);
  }

 
}
