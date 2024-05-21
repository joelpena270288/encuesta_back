import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateLocalidadeDto {
    @IsNotEmpty()
    name: string;  
}
