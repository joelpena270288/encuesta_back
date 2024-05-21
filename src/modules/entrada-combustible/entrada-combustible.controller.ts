import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EntradaCombustibleService } from './entrada-combustible.service';
import { CreateEntradaCombustibleDto } from './dto/create-entrada-combustible.dto';
import { UpdateEntradaCombustibleDto } from './dto/update-entrada-combustible.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('entrada-combustible')
export class EntradaCombustibleController {
  constructor(private readonly entradaCombustibleService: EntradaCombustibleService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createEntradaCombustibleDto: CreateEntradaCombustibleDto) {
    return this.entradaCombustibleService.create(createEntradaCombustibleDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.entradaCombustibleService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradaCombustibleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntradaCombustibleDto: UpdateEntradaCombustibleDto) {
    return this.entradaCombustibleService.update(+id, updateEntradaCombustibleDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradaCombustibleService.remove(id);
  }
}
