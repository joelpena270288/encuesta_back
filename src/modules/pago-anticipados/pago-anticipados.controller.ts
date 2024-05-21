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
import { PagoAnticipadosService } from './pago-anticipados.service';
import { CreatePagoAnticipadoDto } from './dto/create-pago-anticipado.dto';
import { UpdatePagoAnticipadoDto } from './dto/update-pago-anticipado.dto';
import { HasRoles} from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('pago-anticipados')
export class PagoAnticipadosController {
  constructor(
    private readonly pagoAnticipadosService: PagoAnticipadosService,
  ) {}
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createPagoAnticipadoDto: CreatePagoAnticipadoDto) {
    return this.pagoAnticipadosService.create(createPagoAnticipadoDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.pagoAnticipadosService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoAnticipadosService.findOne(+id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePagoAnticipadoDto: UpdatePagoAnticipadoDto,
  ) {
    return this.pagoAnticipadosService.update(+id, updatePagoAnticipadoDto);
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagoAnticipadosService.remove(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getAllByIdCliente/:id')
  getAllByIdCliente(@Param('id') id: string) {
    return this.pagoAnticipadosService.findAllByCliente(id);
  }
}
