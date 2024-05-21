import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ControlCombustibleService } from './control-combustible.service';

import { Filtro } from './dto/filtro.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('control-combustible')
export class ControlCombustibleController {
  constructor(private readonly controlCombustibleService: ControlCombustibleService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()

  create(@Body() filtro: Filtro) {
    return this.controlCombustibleService.getReport(filtro);
  }

 
}
