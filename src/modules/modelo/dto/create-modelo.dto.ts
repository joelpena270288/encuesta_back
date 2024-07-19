import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateModeloDto {
    @IsNotEmpty() 
    name: string;
    @IsNotEmpty() 
    idMarca: string;
    competencia: boolean;
}
