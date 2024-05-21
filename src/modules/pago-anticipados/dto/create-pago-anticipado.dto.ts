import { IsString, IsDecimal, IsNotEmpty, IsDate } from "class-validator";
export class CreatePagoAnticipadoDto {

    @IsNotEmpty()
    idcuenta: string;
    @IsNotEmpty()
    idcliente: string;
    @IsDecimal()
    pago: number;   
    numerocheque: string;
   
    numeroTransferencia: string;
    @IsNotEmpty()
   fechaBanco: Date;
    
    }



