import { PartialType } from '@nestjs/swagger';
import { CreatePagoGastoDto } from './create-pago-gasto.dto';

export class UpdatePagoGastoDto extends PartialType(CreatePagoGastoDto) {}
