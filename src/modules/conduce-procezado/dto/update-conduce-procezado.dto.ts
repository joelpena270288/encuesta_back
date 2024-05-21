import { PartialType } from '@nestjs/swagger';
import { CreateConduceProcezadoDto } from './create-conduce-procezado.dto';

export class UpdateConduceProcezadoDto extends PartialType(CreateConduceProcezadoDto) {}
