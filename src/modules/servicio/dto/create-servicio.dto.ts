import { IsNotEmpty, IsString } from "class-validator";
export class CreateServicioDto {
    @IsNotEmpty()
name: string;
@IsNotEmpty()
descripcion: string;


}
