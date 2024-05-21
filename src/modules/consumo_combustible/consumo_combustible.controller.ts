import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConsumoCombustibleService } from './consumo_combustible.service';
import { CreateConsumoCombustibleDto } from './dto/create-consumo_combustible.dto';
import { UpdateConsumoCombustibleDto } from './dto/update-consumo_combustible.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('consumo-combustible')
export class ConsumoCombustibleController {
  constructor(private readonly consumoCombustibleService: ConsumoCombustibleService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createConsumoCombustibleDto: CreateConsumoCombustibleDto) {
    return this.consumoCombustibleService.create(createConsumoCombustibleDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.consumoCombustibleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumoCombustibleService.findOne(+id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumoCombustibleDto: UpdateConsumoCombustibleDto) {
    return this.consumoCombustibleService.update(+id, updateConsumoCombustibleDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumoCombustibleService.remove(id);
  }
}
