import { IsString, IsInt, IsDate, IsNotEmpty,IsDecimal } from 'class-validator';
export class CreateVentaDto {
    @IsNotEmpty() 
    nombreCliente: string;
    @IsNotEmpty() 
    telefonoCliente: string;    
    correoCliente: string;
    @IsNotEmpty() 
    documentoCliente: string;
    @IsNotEmpty() 
    fecha: Date;
    
    iduser: string;
    @IsNotEmpty()
    chasis: string;
	 @IsNotEmpty()
    marca: string;
    @IsNotEmpty()
    modelo: string;
    @IsNotEmpty()
    model: string;
	
    @IsNotEmpty()
    color: string;
    @IsNotEmpty()
    idVendedor: string;
	@IsDecimal()
	 precioVenta: number;
	 @IsDecimal()
	 precioFinVenta: number;
}

