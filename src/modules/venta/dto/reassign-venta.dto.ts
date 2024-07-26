import { IsString, IsInt, IsDate, IsNotEmpty,IsDecimal } from 'class-validator';
export class ReassignVentaDto {
   
    @IsNotEmpty()   
    
    iduser: string;
   
   
}

