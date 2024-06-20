import { IsString, IsInt, IsDate, IsBoolean, IsNotEmpty} from 'class-validator';
export class FiltroFechaDto {
@IsNotEmpty()
start: Date;
@IsNotEmpty()
end: Date;

}