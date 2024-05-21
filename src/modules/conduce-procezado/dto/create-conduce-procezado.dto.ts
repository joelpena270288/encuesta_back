import { IsString, IsDecimal, IsNotEmpty } from "class-validator";

export class CreateConduceProcezadoDto {
  @IsNotEmpty()
  idconduce: string;

  @IsNotEmpty() 
nombreServicio: string;

@IsNotEmpty() 
UM: string;
@IsDecimal()
cantidad: number;
@IsDecimal()
precio: number;

valorimpuesto: number;




}
