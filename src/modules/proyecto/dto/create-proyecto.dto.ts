import { IsString, IsInt, IsDate, IsBoolean, IsNotEmpty} from 'class-validator';
export class CreateProyectoDto {
@IsNotEmpty()
name: string;
@IsNotEmpty()
idCliente: string;
@IsBoolean()
ajuste: boolean;

}
