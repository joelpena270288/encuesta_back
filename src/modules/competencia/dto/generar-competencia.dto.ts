

import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
import { FiltroFechaDto } from "../../../filtro-fecha/filtro-fecha.dto";


export class GenerarCompetencia{
@IsNotEmpty()
idEncuesta: string;
@IsNotEmpty()
idKpi: string;
@IsNotEmpty()
filtroFecha: FiltroFechaDto;
}