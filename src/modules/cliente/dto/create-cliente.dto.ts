import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
export class CreateClienteDto {
  @IsString()
  nombre: string;
 
  apellidos: string;
  @IsString()
  direccion: string;
  @IsString()
  telefono: string;
  @IsString()
  rcn: string;
  @IsString()
  tipoDocumento: string; 
  email: string;  
  nombrecontacto: string;

}
