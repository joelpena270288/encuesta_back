import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportTrabajadorConduceService } from './report-trabajador-conduce.service';
import {Filtro } from './dto/filto.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('report-trabajador-conduce')
export class ReportTrabajadorConduceController {
  constructor(private readonly reportTrabajadorConduceService: ReportTrabajadorConduceService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() filtro: Filtro) {
    return this.reportTrabajadorConduceService.getReport(filtro);
  }



}
