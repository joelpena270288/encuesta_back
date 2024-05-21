
import { IsString, IsInt,IsDecimal, IsNotEmpty } from "class-validator";
import {CreateGastoItemDto} from '../../gasto_item/dto/create-gasto_item.dto';
export class DescuentoGastosEmpresaDto {
   
    descuento: string;  
   
    @IsDecimal()
    valordescuentoimporte: number;  
    @IsDecimal()
    valordescuentoimpuesto: number;  
  
}
