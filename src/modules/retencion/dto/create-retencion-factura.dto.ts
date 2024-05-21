import { IsString, IsInt, IsDate, IsEmail, IsBoolean, IsDecimal } from 'class-validator';
export class CreateRetencionFacturaDto {
    @IsString()
    idRetencion: string;
    @IsString()
    idFactura: string;
  

}
