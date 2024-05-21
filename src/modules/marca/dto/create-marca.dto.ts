import { IsNotEmpty, IsString } from "class-validator";

export class CreateMarcaDto {
    @IsNotEmpty()
    name: string;
}
