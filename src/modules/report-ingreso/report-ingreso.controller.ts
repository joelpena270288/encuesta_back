import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportIngresoService } from './report-ingreso.service';
import {FiltroFechaDto } from './dto/filtro-fecha.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('report-ingreso')
export class ReportIngresoController {
  constructor(private readonly reportIngresoService: ReportIngresoService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  getReportByDate(@Body() filtroFechaDto: FiltroFechaDto) {
    return this.reportIngresoService.getReportByDate(filtroFechaDto);
  }

 

 

}
