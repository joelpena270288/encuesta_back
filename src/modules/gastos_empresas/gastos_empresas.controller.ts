import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GastosEmpresasService } from './gastos_empresas.service';
import { CreateGastosEmpresaDto } from './dto/create-gastos_empresa.dto';
import { UpdateGastosEmpresaDto } from './dto/update-gastos_empresa.dto';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { RoleEnum } from '../role/enums/role.enum';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { DescuentoGastosEmpresaDto } from './dto/descuento-gastos_empresa.dto';
import { CreateGastoItemDto } from '../gasto_item/dto/create-gasto_item.dto';
import { DeleteGastoItemDto } from './dto/delete-gasto-item.dto';

@Controller('gastos-empresas')
export class GastosEmpresasController {
  constructor(private readonly gastosEmpresasService: GastosEmpresasService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createGastosEmpresaDto: CreateGastosEmpresaDto) {
    return this.gastosEmpresasService.create(createGastosEmpresaDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.gastosEmpresasService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
   @Get('/getCuentasporPagar')
  findAllCuentaPorPagar() {
    return this.gastosEmpresasService.findAllCuentasPorPagar();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getCuentasporPagar/:id')
  findAllCuentaPorPagarByIdProvedor(@Param('id') id: string) {
    return this.gastosEmpresasService.findAllCuentasPorPagarByIdProvedor(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastosEmpresasService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastosEmpresaDto: UpdateGastosEmpresaDto) {
    return this.gastosEmpresasService.update(id, updateGastosEmpresaDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastosEmpresasService.remove(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/Byfilter/:id')
  findAllGastoByFilter(@Param('id') id: string,@Body() filtro: FiltroFechaDto) {
    return this.gastosEmpresasService.findAllGastoByFilter(id,filtro);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/descuento/:id')
  createDescuento(@Param('id') id: string, @Body() descuentoGastosEmpresaDto: DescuentoGastosEmpresaDto) {
    return this.gastosEmpresasService.createDescuento(id, descuentoGastosEmpresaDto);
  }

  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/descuento/:id')
  deleteDescuento(@Param('id') id: string) {
    return this.gastosEmpresasService.deleteDescuento(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/gastoItem/byId/:id')
  addGastoItem(@Param('id') id: string, @Body() createGastoItem: CreateGastoItemDto) {
    return this.gastosEmpresasService.addGastoItem(id, createGastoItem);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/delete/gastoItem/byId/:id')
  deleteGastosIntem(@Param('id') id: string,@Body() iditemgasto: DeleteGastoItemDto) {
    return this.gastosEmpresasService.deleteGastosIntem(id,iditemgasto.idgastoitem);
  }
}
