import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateRespuestaDto {
    @IsNotEmpty()  
    idpregunta: string;
    @IsNotEmpty()
    respuesta: boolean;


}
