import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';

export class UpdateClientePrefacturaDto {
  
    @IsNotEmpty()
    idcliente: string;
   

}