import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateRangoDescuentoDto {
    id: string;
    @IsNotEmpty() 
    name: string;
    @IsInt()
    min: number;
    @IsInt()
    max: number;
    @IsNotEmpty()
    valor: number;
}
