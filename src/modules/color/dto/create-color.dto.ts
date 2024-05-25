import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateColorDto {
    @IsNotEmpty() 
    name: string;
}
