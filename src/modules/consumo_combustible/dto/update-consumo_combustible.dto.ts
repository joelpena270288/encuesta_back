import { PartialType } from '@nestjs/swagger';
import { CreateConsumoCombustibleDto } from './create-consumo_combustible.dto';

export class UpdateConsumoCombustibleDto extends PartialType(CreateConsumoCombustibleDto) {}
