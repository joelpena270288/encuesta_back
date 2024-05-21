import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConduceService } from './conduce.service';
import { CreateConduceDto } from './dto/create-conduce.dto';
import { UpdateConduceDto } from './dto/update-conduce.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { DeleteConduceDto } from './dto/delete-conduce.dto';

@Controller('conduce')
export class ConduceController {
  constructor(private readonly conduceService: ConduceService) {}
  @HasRoles(RoleEnum.ADMIN, RoleEnum.DIGITADOR, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createConduceDto: CreateConduceDto) {
    return this.conduceService.create(createConduceDto);
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.DIGITADOR, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.conduceService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.DIGITADOR, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conduceService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.DIGITADOR, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConduceDto: UpdateConduceDto) {
    return this.conduceService.update(id, updateConduceDto);
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.DIGITADOR, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/cancel/:id')
  cancel(@Param('id') id: string, @Body() deleteConduceDto: DeleteConduceDto) {
    return this.conduceService.cancel(id, deleteConduceDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getacarreo/:idProyecto')
  getAcarreo(@Param('idProyecto') idProyecto: string){
    return this.conduceService.getAcarreoByIdProyecto(idProyecto);

  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getviaje/:idProyecto')
  getControlViajes(@Param('idProyecto') idProyecto: string){
    return this.conduceService.getControlViajeByIdProyecto(idProyecto);

  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/gethora/:idProyecto')
  getControlHoras(@Param('idProyecto') idProyecto: string){
    return this.conduceService.getControlHoraByIdProyecto(idProyecto);

  }
}
