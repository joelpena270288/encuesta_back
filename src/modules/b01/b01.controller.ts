import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { B01Service } from './b01.service';
import { CreateB01Dto } from './dto/create-b01.dto';
import { UpdateB01Dto } from './dto/update-b01.dto';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { HasRoles } from '../role/roles.decorator';

@Controller('b01')
export class B01Controller {
  constructor(private readonly b01Service: B01Service) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createB01Dto: CreateB01Dto) {
    return this.b01Service.create(createB01Dto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all')
  findAll() {
    return this.b01Service.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findOne() {
    return this.b01Service.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateB01Dto: UpdateB01Dto) {
    return this.b01Service.update(+id, updateB01Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.b01Service.remove(+id);
  }
}
