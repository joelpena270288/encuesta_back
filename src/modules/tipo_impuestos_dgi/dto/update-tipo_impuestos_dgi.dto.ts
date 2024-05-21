import { PartialType } from '@nestjs/swagger';
import { CreateTipoImpuestosDgiDto } from './create-tipo_impuestos_dgi.dto';

export class UpdateTipoImpuestosDgiDto extends PartialType(CreateTipoImpuestosDgiDto) {}
