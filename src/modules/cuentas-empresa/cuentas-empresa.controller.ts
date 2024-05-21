import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CuentasEmpresaService } from './cuentas-empresa.service';
import { CreateCuentasEmpresaDto } from './dto/create-cuentas-empresa.dto';
import { UpdateCuentasEmpresaDto } from './dto/update-cuentas-empresa.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('cuentas-empresa')
export class CuentasEmpresaController {
  constructor(private readonly cuentasEmpresaService: CuentasEmpresaService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCuentasEmpresaDto: CreateCuentasEmpresaDto) {
    return this.cuentasEmpresaService.create(createCuentasEmpresaDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.cuentasEmpresaService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentasEmpresaService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentasEmpresaDto: UpdateCuentasEmpresaDto) {
    return this.cuentasEmpresaService.update(id, updateCuentasEmpresaDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentasEmpresaService.remove(id);
  }
}
