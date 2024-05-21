import { PartialType } from '@nestjs/swagger';
import { CreateB14Dto } from './create-b14.dto';

export class UpdateB14Dto extends PartialType(CreateB14Dto) {}
