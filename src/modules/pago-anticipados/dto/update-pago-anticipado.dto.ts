import { PartialType } from '@nestjs/swagger';
import { CreatePagoAnticipadoDto } from './create-pago-anticipado.dto';

export class UpdatePagoAnticipadoDto extends PartialType(CreatePagoAnticipadoDto) {}
