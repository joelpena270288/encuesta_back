import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProvedorService } from './provedor.service';
import { CreateProvedorDto } from './dto/create-provedor.dto';
import { UpdateProvedorDto } from './dto/update-provedor.dto';
import { RoleEnum } from '../role/enums/role.enum';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('provedor')
export class ProvedorController {
  constructor(private readonly provedorService: ProvedorService) {}
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
    RoleEnum.ADMINISTRATIVO
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createProvedorDto: CreateProvedorDto) {
    return this.provedorService.create(createProvedorDto);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
    RoleEnum.ADMINISTRATIVO,
    RoleEnum.DIGITADOR
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.provedorService.findAll();
  }
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
    RoleEnum.ADMINISTRATIVO,
    RoleEnum.DIGITADOR
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provedorService.findOne(id);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
    RoleEnum.ADMINISTRATIVO,
  
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProvedorDto: UpdateProvedorDto) {
    return this.provedorService.update(id, updateProvedorDto);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
    RoleEnum.ADMINISTRATIVO,
   
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provedorService.remove(id);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
    RoleEnum.ADMINISTRATIVO,
    RoleEnum.DIGITADOR
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getAll/cuentasporpagar')
  findAllCuentasPorPagar() {
    return this.provedorService.provedorCuentaPorPagar();
  }
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
    RoleEnum.ADMINISTRATIVO,
    RoleEnum.DIGITADOR
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getAll/cuentasporpagar/informal')
  findAllCuentasPorPagarInformal() {
    return this.provedorService.provedorCuentaPorPagarInformal();
  }
}
