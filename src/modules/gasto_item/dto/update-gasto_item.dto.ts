import { PartialType } from '@nestjs/swagger';
import { CreateGastoItemDto } from './create-gasto_item.dto';

export class UpdateGastoItemDto extends PartialType(CreateGastoItemDto) {}
