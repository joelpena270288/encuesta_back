
import { IsString, IsInt,IsDecimal, IsNotEmpty } from "class-validator";
export class CreateGastoItemDto {
	 @IsDecimal()
    cantidad: number;  
    @IsNotEmpty()
    descripcion: string;  
    @IsDecimal()
    importeimpuesto: number;  
    @IsDecimal() 
    importe: number;
    @IsDecimal() 
    preciounitario: number;
    idequipo: string; 
 
}
