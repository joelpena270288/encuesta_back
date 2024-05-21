import { PartialType } from '@nestjs/swagger';
import { CreateServicioProcesadoDto } from './create-servicio-procesado.dto';

export class UpdateServicioProcesadoDto extends PartialType(CreateServicioProcesadoDto) {}
