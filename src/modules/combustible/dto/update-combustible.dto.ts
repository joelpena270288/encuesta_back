import { PartialType } from '@nestjs/swagger';
import { CreateCombustibleDto } from './create-combustible.dto';

export class UpdateCombustibleDto extends PartialType(CreateCombustibleDto) {}
