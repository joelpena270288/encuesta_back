import { IsString, IsInt, IsDate, IsEmail, IsBoolean, IsDecimal } from 'class-validator';
export class CreateRetencionGastoDto {
    @IsString()
    idRetencion: string;
    @IsString()
    idGasto: string;
  

}
