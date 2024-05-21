import { IsString, IsDecimal, IsNotEmpty } from "class-validator";
export class CreatePagoFacturaAnticipoDto {
@IsNotEmpty()
idpagoAnticipo: string;
@IsNotEmpty()
idfactura: string;

}
