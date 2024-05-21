import { IsString, IsInt,IsDecimal, IsNotEmpty } from "class-validator";
export class CreateCotizacionDto {
   
  @IsNotEmpty()  
    nombreServicio: string;
   
  @IsNotEmpty() 
    UM: string;
    @IsDecimal()
    cantidad: number;
    @IsDecimal()
    precio: number;
    @IsDecimal()
    valorimpuesto: number; 
  
    @IsNotEmpty()
    proyectoId: string;
    

}
