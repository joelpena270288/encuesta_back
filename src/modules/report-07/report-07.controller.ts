import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Report07Service } from './report-07.service';

import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('report-07')
export class Report07Controller {
  constructor(private readonly report07Service: Report07Service) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  getReport07(@Body() filtroFechaDto: FiltroFechaDto) {
    return this.report07Service.getReport07(filtroFechaDto);
  }
}
