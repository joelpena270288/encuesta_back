import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateEquipoDto {
    @IsNotEmpty() 
    ficha: string;
    @IsNotEmpty()
    placa: string; 
    @IsNotEmpty()
    chasis: string;
    @IsInt()
     anno: number; 
     @IsNotEmpty()
    color: string;  
    @IsNotEmpty() 
    idmarca: string;
    @IsNotEmpty()  
    idtipo: string;
	metraje: string;
	@IsNotEmpty() 
    modelo: string;
	
}
