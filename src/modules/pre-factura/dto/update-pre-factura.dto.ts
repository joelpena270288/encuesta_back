import { PartialType } from '@nestjs/swagger';
import { CreatePreFacturaDto } from './create-pre-factura.dto';

export class UpdatePreFacturaDto extends PartialType(CreatePreFacturaDto) {}
