import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TipoImpuestosDgiService } from './tipo_impuestos_dgi.service';
import { CreateTipoImpuestosDgiDto } from './dto/create-tipo_impuestos_dgi.dto';
import { UpdateTipoImpuestosDgiDto } from './dto/update-tipo_impuestos_dgi.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('tipo-impuestos-dgi')
export class TipoImpuestosDgiController {
  constructor(private readonly tipoImpuestosDgiService: TipoImpuestosDgiService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTipoImpuestosDgiDto: CreateTipoImpuestosDgiDto) {
    return this.tipoImpuestosDgiService.create(createTipoImpuestosDgiDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.tipoImpuestosDgiService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoImpuestosDgiService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoImpuestosDgiDto: UpdateTipoImpuestosDgiDto) {
    return this.tipoImpuestosDgiService.update(id, updateTipoImpuestosDgiDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoImpuestosDgiService.remove(id);
  }
}
