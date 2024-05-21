import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReportCombustibleService } from './report-combustible.service';

import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { Filtro } from './dto/filto.dto';

@Controller('report-combustible')
export class ReportCombustibleController {
  constructor(private readonly reportCombustibleService: ReportCombustibleService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()

  create(@Body() filtro: Filtro) {
    return this.reportCombustibleService.getReport(filtro);
  }

  
}
