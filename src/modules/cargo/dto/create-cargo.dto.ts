import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateCargoDto {
    @IsString()
    name: string;
    @IsString()
    descripcion: string;
}
