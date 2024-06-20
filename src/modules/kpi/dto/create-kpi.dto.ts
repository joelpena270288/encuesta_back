import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateKpiDto {
    @IsNotEmpty() 
    name: string; 
   @IsNotEmpty()
    indiceEncuesta: number; 
    @IsNotEmpty()
    indiceVenta: number; 
    @IsNotEmpty()
    indiceDescuesto: number; 
}
