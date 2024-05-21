import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
export class CreateCombustibleDto {
   
  @IsNotEmpty()
    name: string;
}
