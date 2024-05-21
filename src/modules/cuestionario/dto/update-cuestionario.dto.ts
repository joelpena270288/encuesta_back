import { PartialType } from '@nestjs/swagger';
import { CreateCuestionarioDto } from './create-cuestionario.dto';

export class UpdateCuestionarioDto extends PartialType(CreateCuestionarioDto) {}
