import { IsString, IsInt, IsDate, IsNotEmpty, IsBoolean } from 'class-validator';
export class CreateRespuestaDto {
    @IsNotEmpty()  
    idpregunta: string;
    @IsBoolean()
    respuesta: boolean;


}
