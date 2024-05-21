
import { IsNotEmpty, IsString } from "class-validator";
export class CreateCuentasEmpresaDto {
   
  @IsNotEmpty()
    idmoneda: string;
    @IsNotEmpty()
    numerocuenta: string;
    @IsNotEmpty()
    banco: string;

}
