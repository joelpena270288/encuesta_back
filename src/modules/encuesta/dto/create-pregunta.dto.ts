import { IsString, IsInt, IsDate, IsNotEmpty, IsBoolean } from 'class-validator';
export class CreatePreguntaDto {
    @IsNotEmpty() 
    text: string;
    @IsInt()
    valor: number;
    @IsBoolean()
    respuesta: boolean;

}