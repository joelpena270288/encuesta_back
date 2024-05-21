import { IsString, IsInt, IsDate, IsDecimal } from 'class-validator';
export class CreateServicioProcesadoDto {
   @IsDecimal()
    cantidad: number;
    @IsDecimal()
    precio: number;
	 @IsDecimal()
    valorimpuesto: number;
}
