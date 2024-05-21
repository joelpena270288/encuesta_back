import { PartialType } from '@nestjs/swagger';
import { CreateCuentasEmpresaDto } from './create-cuentas-empresa.dto';

export class UpdateCuentasEmpresaDto extends PartialType(CreateCuentasEmpresaDto) {}
