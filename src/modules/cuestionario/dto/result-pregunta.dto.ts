import { IsString, IsInt, IsDate, IsNotEmpty, IsBoolean } from 'class-validator';
export class ResultPreguntaDto {   
   enunciado: string;  
  respuestaEsperada: boolean;
  valor: number;
  respuesta: boolean;


}
