import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateVendedorDto {
    @IsNotEmpty() 
    name: string;
    @IsNotEmpty() 
    lastname: string;
    @IsNotEmpty() 
    address: string;
    @IsNotEmpty() 
    phone: string;
    @IsNotEmpty() 
    documento: string;
    @IsNotEmpty() 
    idGrupo: string;   
}
