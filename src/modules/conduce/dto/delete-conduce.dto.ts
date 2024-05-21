import { IsNotEmpty, IsString } from "class-validator";

export class DeleteConduceDto {
    
  @IsNotEmpty()
    motivo: string;  
   
 
}
