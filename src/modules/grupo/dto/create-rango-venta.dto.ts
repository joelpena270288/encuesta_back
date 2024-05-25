import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateRangoVentaDto {
    @IsNotEmpty() 
    name: string;
    @IsInt()
    min: number;
    @IsInt()
    max: number;
    @IsInt()
    valor: number;
}
