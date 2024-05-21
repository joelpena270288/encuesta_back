import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateEntidadDto {
    @IsNotEmpty() 
    name: string;
    rnc: string;

}
