import { PartialType } from '@nestjs/swagger';
import { CreateEntradaCombustibleDto } from './create-entrada-combustible.dto';

export class UpdateEntradaCombustibleDto extends PartialType(CreateEntradaCombustibleDto) {}
