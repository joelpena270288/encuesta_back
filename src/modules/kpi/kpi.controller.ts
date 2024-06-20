import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('kpi')
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createKpiDto: CreateKpiDto, @GetUser() user: User) {
    return this.kpiService.create(createKpiDto,user);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.kpiService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kpiService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKpiDto: UpdateKpiDto, @GetUser() user: User) {
    return this.kpiService.update(id, updateKpiDto,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.kpiService.remove(id,user);
  }
}
