import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateMarcaDto {
    @IsNotEmpty() 
    name: string;
    competencia: boolean;
    
}
