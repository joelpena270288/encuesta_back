import { IsString, IsInt, IsDate, IsEmail, IsBoolean } from 'class-validator';
export class CreateProvedorDto {
    @IsString()
    nombre: string;     
    @IsString()
    direccion: string;  
    @IsString()
    documento: string;
    @IsString()
    tipodocumento: string; 
    @IsBoolean()
    informal: boolean; 
    telefono: string;
   
}
