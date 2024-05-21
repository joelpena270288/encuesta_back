import { PartialType } from '@nestjs/swagger';
import { CreateB01Dto } from './create-b01.dto';

export class UpdateB01Dto extends PartialType(CreateB01Dto) {}
