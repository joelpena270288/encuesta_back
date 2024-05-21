import { IsString, IsInt, IsDecimal, IsNotEmpty } from 'class-validator';
import { CreateGastoItemDto } from '../../gasto_item/dto/create-gasto_item.dto';
export class CreateGastosEmpresaDto {
  @IsNotEmpty()
  descripcion: string;

  NCF: string;
  @IsNotEmpty()
  factura: string;

  @IsDecimal()
  propina: number;
  @IsDecimal()
  impuestoselectivoconsumo: number;
  @IsDecimal()
  impuestoclaro: number;

  @IsNotEmpty()
  fecha: Date;
  idproyecto: string;
  @IsNotEmpty()
  idprovedor: string;
  tipopago: string;
  @IsNotEmpty()
  metodoPago: string;
  @IsNotEmpty()
  idmoneda: string;
  @IsDecimal()
  tasadgii: number;
  items: CreateGastoItemDto[];
}
