import { PartialType } from '@nestjs/swagger';
import { CreatePagoFacturaDto } from './create-pago-factura.dto';

export class UpdatePagoFacturaDto extends PartialType(CreatePagoFacturaDto) {}
