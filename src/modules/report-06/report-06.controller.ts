import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Report06Service } from './report-06.service';
import {FiltroFechaDto} from './dto/filtro-fecha.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';


@Controller('report-06')
export class Report06Controller {
  constructor(private readonly report06Service: Report06Service) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  getReport06(@Body() filtroFechaDto: FiltroFechaDto) {
    return this.report06Service.getReport06(filtroFechaDto);
  }

 

 




}
