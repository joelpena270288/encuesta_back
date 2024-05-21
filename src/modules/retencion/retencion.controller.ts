import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RetencionService } from './retencion.service';
import { CreateRetencionDto } from './dto/create-retencion.dto';
import { UpdateRetencionDto } from './dto/update-retencion.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { CreateRetencionGastoDto } from './dto/create-retencion-gasto.dto';
import { CreateRetencionFacturaDto } from './dto/create-retencion-factura.dto';

@Controller('retencion')
export class RetencionController {
  constructor(private readonly retencionService: RetencionService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createRetencionDto: CreateRetencionDto) {
    return this.retencionService.create(createRetencionDto);
  }
 
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/gasto')
  createGasto(@Body() createRetencionDto: CreateRetencionGastoDto) {
    return this.retencionService.adicionarRetencion(createRetencionDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/factura/retencion')
  createFactura(@Body() createRetencionDto: CreateRetencionFacturaDto) {
    return this.retencionService.adicionarRetencionFactura(createRetencionDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.retencionService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retencionService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetencionDto: UpdateRetencionDto) {
    return this.retencionService.update(id, updateRetencionDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retencionService.remove(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/gasto/:id')
  removegasto(@Param('id') id: string) {
    return this.retencionService.EliminarRetencion(id);
   
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/factura/retencion/:id')
  removefactura(@Param('id') id: string) {
    return this.retencionService.EliminarRetencionFactura(id);
  }
}
