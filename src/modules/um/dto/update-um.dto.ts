import { PartialType } from '@nestjs/swagger';
import { CreateUmDto } from './create-um.dto';

export class UpdateUmDto extends PartialType(CreateUmDto) {}
