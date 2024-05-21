import { PartialType } from '@nestjs/swagger';
import { CreateProvedorDto } from './create-provedor.dto';

export class UpdateProvedorDto extends PartialType(CreateProvedorDto) {}
