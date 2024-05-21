import { IsString, IsInt, IsDate, IsBoolean, IsNotEmpty} from 'class-validator';
export class Filtro{
    @IsNotEmpty()
start: Date;
@IsNotEmpty()
end: Date;


}