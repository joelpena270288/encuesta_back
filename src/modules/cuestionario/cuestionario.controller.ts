import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CuestionarioService } from './cuestionario.service';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { RoleEnum } from '../role/enums/role.enum';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { GetUser } from '../auth/user.decorator';
import { User } from '../users/entities/user.entity';
import { ParamResultDto } from './dto/params-result.dto';

@Controller('cuestionario')
export class CuestionarioController {
  constructor(private readonly cuestionarioService: CuestionarioService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCuestionarioDto: CreateCuestionarioDto, @GetUser() user: User) {
    return this.cuestionarioService.create(createCuestionarioDto,user);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.cuestionarioService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER,RoleEnum.VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuestionarioService.findOne(id);
  }

 
  @HasRoles(RoleEnum.ADMIN,RoleEnum.HOSTER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string,@GetUser() user: User) {
    return this.cuestionarioService.remove(id,user);
  }
  @HasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/result')
  resultByEncuesta(@Body() param: ParamResultDto) {
    return this.cuestionarioService.findResult(param);
  }
}
