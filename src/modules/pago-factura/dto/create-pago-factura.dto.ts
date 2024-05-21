import { IsString, IsDecimal, IsNotEmpty, IsDate } from "class-validator";
export class CreatePagoFacturaDto {
    @IsNotEmpty()
idcuenta: string;
@IsNotEmpty()
idfactura: string;
@IsDecimal()
pago: number;

numerocheque: string;
numeroTransferencia: string;
@IsNotEmpty()
fechaBanco: Date;
}
