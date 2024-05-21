import { IsString, IsInt,IsDecimal,IsDate, IsNotEmpty } from "class-validator";
export class CreateConsumoCombustibleDto {
 @IsDecimal()
galones: number;

@IsNotEmpty()
idcombustible: string;
@IsNotEmpty()
idequipo: string;

idproyecto: string;

 @IsNotEmpty()
fecha: Date; 


}
