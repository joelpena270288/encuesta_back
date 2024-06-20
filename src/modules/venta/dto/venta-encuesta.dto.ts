import { IsString, IsInt, IsDate, IsNotEmpty,IsDecimal } from 'class-validator';
import {Encuesta} from '../../encuesta/entities/encuesta.entity'
export class VentaEncuesta {  
    id: string;
    nombreCliente: string;   
    telefonoCliente: string;    
    correoCliente: string;   
    documentoCliente: string;   
    fecha: Date;  
    chasis: string;	
    marca: string;   
    modelo: string;   
    color: string; 
    encuestasCompletadas: Encuesta[];	
  
}

