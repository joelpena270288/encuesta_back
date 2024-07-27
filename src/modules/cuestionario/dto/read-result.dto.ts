import { IsString, IsInt, IsDate, IsNotEmpty, IsBoolean } from 'class-validator';
import { ResultPreguntaDto } from './result-pregunta.dto';
export class ReadResultDto {   
   result: ResultPreguntaDto[];

}
