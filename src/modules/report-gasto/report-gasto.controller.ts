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
import { ReportGastoService } from './report-gasto.service';

import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('report-gasto')
export class ReportGastoController {
  constructor(private readonly reportGastoService: ReportGastoService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  getReport(@Body() filtroFechaDto: FiltroFechaDto) {
    return this.reportGastoService.getReport(filtroFechaDto);
  }
}
