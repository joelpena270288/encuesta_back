import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateVentaDto {
    @IsNotEmpty() 
    nombreCliente: string;
    @IsNotEmpty() 
    telefonoCliente: string;
    @IsNotEmpty() 
    correoCliente: string;
    @IsNotEmpty() 
    documentoCliente: string;
    @IsNotEmpty() 
    fecha: Date;
    @IsNotEmpty() 
    iduser: string;
    @IsNotEmpty()
    chasis: string;
    @IsNotEmpty()
    modelo: string;
    @IsNotEmpty()
    color: string;
    @IsNotEmpty()
    idVendedor: string;
}
