import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlertCuentasPorCobrarService } from './alert-cuentas-por-cobrar.service';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';


@Controller('alert-cuentas-por-cobrar')
export class AlertCuentasPorCobrarController {
  constructor(private readonly alertCuentasPorCobrarService: AlertCuentasPorCobrarService) {}

  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.alertCuentasPorCobrarService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findAllByIdCliente(@Param('id') id: string) {
    return this.alertCuentasPorCobrarService.findAllByIdCliente(id);
  }



}
