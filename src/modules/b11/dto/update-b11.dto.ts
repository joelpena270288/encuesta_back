import { PartialType } from '@nestjs/swagger';
import { CreateB11Dto } from './create-b11.dto';

export class UpdateB11Dto extends PartialType(CreateB11Dto) {}
