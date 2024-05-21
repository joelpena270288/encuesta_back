import { PartialType } from '@nestjs/swagger';
import { CreateConduceDto } from './create-conduce.dto';

export class UpdateConduceDto extends PartialType(CreateConduceDto) {}
