import { IsString, IsInt, IsDate, IsEmail, IsBoolean, IsDecimal } from 'class-validator';
export class CreateRetencionDto {
    @IsString()
    name: string;
    @IsDecimal()
    valorimpuesto: number;
    @IsDecimal()
    valorretencion: number;
    descripcion: string;

}
