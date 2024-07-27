import { IsString, IsInt, IsDate, IsNotEmpty, IsBoolean } from 'class-validator';
export class ParamResultDto {
    @IsNotEmpty()  
    idVenta: string;
    @IsBoolean()
    idEncuesta: boolean;


}
