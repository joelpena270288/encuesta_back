import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
import {CreateRespuestaDto} from './create-respuesta.dto';
export class CreateCuestionarioDto {
    @IsNotEmpty()
    idEncuesta: string;
 
    @IsNotEmpty()
    idVenta: string;
    @IsNotEmpty()
    respuestas: CreateRespuestaDto[];
}
