import { PartialType } from '@nestjs/swagger';
import { CreateGastosEmpresaDto } from './create-gastos_empresa.dto';

export class UpdateGastosEmpresaDto extends PartialType(CreateGastosEmpresaDto) {}
