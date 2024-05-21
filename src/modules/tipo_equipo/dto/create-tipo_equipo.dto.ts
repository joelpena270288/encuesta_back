import { IsNotEmpty, IsString } from "class-validator";

export class CreateTipoEquipoDto {
    @IsNotEmpty()
    name: string;
}
