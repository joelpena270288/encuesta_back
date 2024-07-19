import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
import {CreateRangoDescuentoDto} from './create-rango-descuento.dto';
import {CreateRangoEncuestaDto} from './create-rango-encuesta.dto';
import {CreateRangoVentaDto} from './create-rango-venta.dto';
export class CreateGrupoDto {
    @IsNotEmpty() 
    name: string;
    @IsNotEmpty() 
    rangosDescuestos: CreateRangoDescuentoDto[];
    @IsNotEmpty() 
    rangosEncuestas: CreateRangoEncuestaDto[];
    @IsNotEmpty() 
    rangosVentas: CreateRangoVentaDto[];
	 @IsNotEmpty()	
     color: string;
     competencia: boolean;
	
   
}
