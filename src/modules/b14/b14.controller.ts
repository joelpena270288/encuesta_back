import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { B14Service } from './b14.service';
import { CreateB14Dto } from './dto/create-b14.dto';
import { UpdateB14Dto } from './dto/update-b14.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('b14')
export class B14Controller {
  constructor(private readonly b14Service: B14Service) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createB14Dto: CreateB14Dto) {
    return this.b14Service.create(createB14Dto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all')
  findAll() {
    return this.b14Service.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findOne() {
    return this.b14Service.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateB14Dto: UpdateB14Dto) {
    return this.b14Service.update(+id, updateB14Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.b14Service.remove(+id);
  }
}
