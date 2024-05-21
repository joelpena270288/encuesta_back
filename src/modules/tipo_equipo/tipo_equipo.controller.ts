import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TipoEquipoService } from './tipo_equipo.service';
import { CreateTipoEquipoDto } from './dto/create-tipo_equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo_equipo.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('tipo-equipo')
export class TipoEquipoController {
  constructor(private readonly tipoEquipoService: TipoEquipoService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTipoEquipoDto: CreateTipoEquipoDto) {
    return this.tipoEquipoService.create(createTipoEquipoDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.tipoEquipoService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoEquipoService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoEquipoDto: UpdateTipoEquipoDto) {
    return this.tipoEquipoService.update(id, updateTipoEquipoDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoEquipoService.remove(id);
  }
}
