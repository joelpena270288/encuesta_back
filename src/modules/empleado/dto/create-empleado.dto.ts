import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateEmpleadoDto {
    @IsNotEmpty()
name: string;
@IsNotEmpty()
lastname: string;
@IsNotEmpty()
phone: string;
@IsNotEmpty()
address: string;

passport: string;

cedule: string;
cargos: string[];
@IsNotEmpty()
fecha: Date;

}
