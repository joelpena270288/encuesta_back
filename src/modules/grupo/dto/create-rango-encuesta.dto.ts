import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateRangoEncuestaDto {
    @IsNotEmpty() 
    name: string;
    @IsInt()
    min: number;
    @IsInt()
    max: number;
    @IsInt()
    valor: number;
}
