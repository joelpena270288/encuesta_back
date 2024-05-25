import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
import {CreatePreguntaDto} from './create-pregunta.dto';
export class CreateEncuestaDto {
    @IsNotEmpty() 
    name: string;
     @IsInt()
    valor: number;  
    
    preguntas: CreatePreguntaDto[];
}
