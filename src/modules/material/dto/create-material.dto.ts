import { IsNotEmpty } from "class-validator";

export class CreateMaterialDto {
    @IsNotEmpty()
    name: string;
}
