import { IsString, IsInt, IsDate, IsBoolean, IsNotEmpty} from 'class-validator';
export class CreateReporteEncuestaDto {
@IsNotEmpty()
start: Date;
@IsNotEmpty()
end: Date;
@IsNotEmpty()
idEncuesta: String;
@IsNotEmpty()
idUser: String;
}
