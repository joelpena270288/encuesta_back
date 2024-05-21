import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ImpuestosDgiService } from './impuestos_dgi.service';
import { CreateImpuestosDgiDto } from './dto/create-impuestos_dgi.dto';
import { UpdateImpuestosDgiDto } from './dto/update-impuestos_dgi.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';

@Controller('impuestos-dgi')
export class ImpuestosDgiController {
  constructor(private readonly impuestosDgiService: ImpuestosDgiService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createImpuestosDgiDto: CreateImpuestosDgiDto) {
    return this.impuestosDgiService.create(createImpuestosDgiDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.impuestosDgiService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.impuestosDgiService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImpuestosDgiDto: UpdateImpuestosDgiDto) {
    return this.impuestosDgiService.update(id, updateImpuestosDgiDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.impuestosDgiService.remove(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/Byfilter/:id')
  findAllImpuestoByFilter(@Param('id') id: string,@Body() filtro: FiltroFechaDto) {
    return this.impuestosDgiService.findAllImpuestoByFilter(id,filtro);
  }
}
