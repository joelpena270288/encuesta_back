import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EncuestaService } from './encuesta.service';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('encuesta')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createEncuestaDto: CreateEncuestaDto,@GetUser() user: User) {
    return this.encuestaService.create(createEncuestaDto,user);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.encuestaService.findAll();
  }
   @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/activas')
  findAllActivas() {
    return this.encuestaService.findAllActivas();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encuestaService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEncuestaDto: UpdateEncuestaDto,@GetUser() user: User) {
    return this.encuestaService.update(id, updateEncuestaDto,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@GetUser() user: User) {
    return this.encuestaService.remove(id,user);
  }
}
