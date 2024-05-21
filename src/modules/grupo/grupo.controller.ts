import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleEnum } from '../role/enums/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createGrupoDto: CreateGrupoDto, @GetUser() user: User) {
    return this.grupoService.create(createGrupoDto,user);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.grupoService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto, @GetUser() user: User) {
    return this.grupoService.update(id, updateGrupoDto,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.grupoService.remove(id,user);
  }
}
