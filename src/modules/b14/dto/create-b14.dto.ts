import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateB14Dto {
   @IsInt()
    init: number;
    @IsInt()
    end: number;
    @IsNotEmpty() 
    fecha: Date;
}
