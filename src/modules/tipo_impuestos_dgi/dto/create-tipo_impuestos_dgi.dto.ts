import { IsString, IsInt, IsDate, IsDecimal, IsNotEmpty } from 'class-validator';
export class CreateTipoImpuestosDgiDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    identidad: string;
   
}
