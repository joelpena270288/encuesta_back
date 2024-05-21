import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { VendedorService } from './vendedor.service';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { UpdateVendedorDto } from './dto/update-vendedor.dto';
import { GetUser } from '../auth/user.decorator';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { RoleEnum } from '../role/enums/role.enum';
import { User } from '../users/entities/user.entity';

@Controller('vendedor')
export class VendedorController {
  constructor(private readonly vendedorService: VendedorService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createVendedorDto: CreateVendedorDto,@GetUser() user: User) {
    return this.vendedorService.create(createVendedorDto,user);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.vendedorService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendedorService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendedorDto: UpdateVendedorDto,@GetUser() user: User) {
    return this.vendedorService.update(id, updateVendedorDto,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@GetUser() user: User) {
    return this.vendedorService.remove(id,user);
  }
}
