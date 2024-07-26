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
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
import { RoleEnum } from '../role/enums/role.enum';
import { ReassignVentaDto } from './dto/reassign-venta.dto';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createVentaDto: CreateVentaDto, @GetUser() user: User) {
    return this.ventaService.create(createVentaDto, user);
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.HOSTER, RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.ventaService.findAll();
  }
  @HasRoles(RoleEnum.VENDEDOR, RoleEnum.HOSTER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/ByUser')
  findAllByUser(@GetUser() user: User) {
    return this.ventaService.findAllByUser(user);
  }

  @HasRoles(RoleEnum.ADMIN, RoleEnum.HOSTER, RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventaService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVentaDto: UpdateVentaDto,
    @GetUser() user: User,
  ) {
    return this.ventaService.update(id, updateVentaDto, user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.ventaService.remove(id, user);
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.HOSTER, RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/all/actual')
  findAllActual() {
    return this.ventaService.ventasActuales();
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/reassign/:id')
  reassign(
    @Param('id') id: string,
    @Body() updateVentaDto:ReassignVentaDto,
    @GetUser() user: User,
  ) {
    return this.ventaService.update(id, updateVentaDto, user);
  }
}
