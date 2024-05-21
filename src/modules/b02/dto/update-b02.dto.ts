import { PartialType } from '@nestjs/swagger';
import { CreateB02Dto } from './create-b02.dto';

export class UpdateB02Dto extends PartialType(CreateB02Dto) {}
