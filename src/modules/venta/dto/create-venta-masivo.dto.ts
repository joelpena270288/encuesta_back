import { IsString, IsInt, IsDate, IsNotEmpty,IsDecimal } from 'class-validator';
export class CreateVentaMasivaDto {
    @IsNotEmpty() 
    FECHA_VENTA: Date;
    @IsNotEmpty() 
    MODELO: string;  
    @IsNotEmpty() 
    CHASIS: string;
    @IsNotEmpty() 
    COLOR: string;   
    @IsNotEmpty()
    NOMBRE_COMPLETO_CLIENTE: string;
	EMAIL_CLIENTE: string;
    @IsNotEmpty()
    DOCUMENTO_CLIENTE: string;
    @IsNotEmpty()
    TELEFONO_CLIENTE: string;	
    @IsNotEmpty()
    DOCUMENTO_VENDEDOR: string;  
	@IsDecimal()
    PRECIO_REGULAR: number;
	 @IsDecimal()
	 PRECIO_VENTA: number;
}

