import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { B02Service } from './b02.service';
import { CreateB02Dto } from './dto/create-b02.dto';
import { UpdateB02Dto } from './dto/update-b02.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum} from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('b02')
export class B02Controller {
  constructor(private readonly b02Service: B02Service) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createB02Dto: CreateB02Dto) {
    return this.b02Service.create(createB02Dto);
  }


  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findOne() {
    return this.b02Service.findOne();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all')
  findAll() {
    return this.b02Service.findAll();
  }

}
