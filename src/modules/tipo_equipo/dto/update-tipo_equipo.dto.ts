import { PartialType } from '@nestjs/swagger';
import { CreateTipoEquipoDto } from './create-tipo_equipo.dto';

export class UpdateTipoEquipoDto extends PartialType(CreateTipoEquipoDto) {}
