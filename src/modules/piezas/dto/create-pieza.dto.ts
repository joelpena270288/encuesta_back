import { IsString, IsInt,IsDecimal,IsDate, IsNotEmpty } from "class-validator";
export class CreatePiezaDto {
    @IsInt()
    cantidad: number;
    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()
    serie: string;
    @IsNotEmpty()
    descripcion: string;
}
