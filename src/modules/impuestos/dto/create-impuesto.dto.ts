import { IsString, IsInt, IsDate, IsDecimal, IsNotEmpty } from 'class-validator';
export class CreateImpuestoDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    descripcion: string;
    @IsDecimal()
    valor: number;
}
