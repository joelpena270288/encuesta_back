

import { IsString, IsDecimal, IsNotEmpty } from "class-validator";
export class CreateMonedaDto {
  @IsNotEmpty()
  valor: string;
@IsDecimal()
tasa: number;
}
