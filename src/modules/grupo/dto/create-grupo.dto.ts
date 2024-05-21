import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateGrupoDto {
    @IsNotEmpty() 
    name: string;
}
