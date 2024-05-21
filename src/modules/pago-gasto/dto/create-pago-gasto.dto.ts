import { IsString, IsDecimal, IsNotEmpty } from "class-validator";
export class CreatePagoGastoDto {
    @IsNotEmpty()
    idcuenta: string;
    @IsNotEmpty()
    idgasto: string;
    @IsDecimal()
    pago: number;
   
    numerocheque: string;
    numeroTransferencia: string;
    @IsNotEmpty()
  fechaBanco: Date;
 

}
