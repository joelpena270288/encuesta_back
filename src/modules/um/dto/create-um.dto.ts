import { IsNotEmpty, IsString } from "class-validator";
export class CreateUmDto {
    @IsNotEmpty()
    name: string;
}
