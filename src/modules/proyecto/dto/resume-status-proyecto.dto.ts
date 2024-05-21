import { IsString, IsInt, IsDate, IsBoolean} from 'class-validator';
export class ResumenProyectosDto {
@IsInt()
creados: number;
@IsInt()
aprobados: number;
@IsInt()
completados: number;
@IsInt()
cancelados: number;

}
