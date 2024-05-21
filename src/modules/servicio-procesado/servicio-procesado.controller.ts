import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServicioProcesadoService } from './servicio-procesado.service';
import { CreateServicioProcesadoDto } from './dto/create-servicio-procesado.dto';
import { UpdateServicioProcesadoDto } from './dto/update-servicio-procesado.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
@Controller('servicio-procesado')
export class ServicioProcesadoController {
  constructor(private readonly servicioProcesadoService: ServicioProcesadoService) {}
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createServicioProcesadoDto: CreateServicioProcesadoDto) {
    return this.servicioProcesadoService.create(createServicioProcesadoDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)

  @Get()
  findAll() {
    return this.servicioProcesadoService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicioProcesadoService.findOne(id);
  }
 @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicioProcesadoDto: UpdateServicioProcesadoDto) {
    return this.servicioProcesadoService.update(id, updateServicioProcesadoDto);
  }
 @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicioProcesadoService.remove(id);
  }
  
  
}
