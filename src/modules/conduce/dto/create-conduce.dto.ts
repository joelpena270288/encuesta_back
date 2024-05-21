import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateConduceDto {
    
  @IsNotEmpty()
    name: string;  
   
  @IsNotEmpty()
    idProyecto: string;  
   
  @IsNotEmpty() 
    idEmpleado: string;  
    
  @IsNotEmpty()
    idServicio: string;   
  
    @IsNotEmpty()
    idEquipo: string;  
    

    firma_chofer: string;  
    

    firma_cliente: string;  

    observaciones: string; 
   
    @IsString()
    horaInicio: string;
    @IsString()
    horaFin: string;
   
    desde: string; 
   
    hasta: string;   
   
 
    idMaterial: string;
    cantidadViaje: number;
    metrosCubicos: number;
  
   
    reportadasequipo: string;
   
 
    reportadastrabajador: string;
 
   
    cantidadConsummoCombustible: string;
    @IsInt()
    numero: number;
    @IsNotEmpty()
    fecha: Date; 
}
