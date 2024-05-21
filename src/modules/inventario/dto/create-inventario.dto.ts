import { IsDecimal, IsNotEmpty } from "class-validator";


export class CreateInventarioDto {
    @IsDecimal()
    cantidad: number;
    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()
    serie: string;
    @IsNotEmpty()

    descripcion: string; 
    @IsDecimal()

    precioUnitario: number; 
    	
    @IsNotEmpty()
     idequipo: string;
}
