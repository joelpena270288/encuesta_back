import { PartialType } from '@nestjs/swagger';
import { CreateImpuestosDgiDto } from './create-impuestos_dgi.dto';

export class UpdateImpuestosDgiDto extends PartialType(CreateImpuestosDgiDto) {}
