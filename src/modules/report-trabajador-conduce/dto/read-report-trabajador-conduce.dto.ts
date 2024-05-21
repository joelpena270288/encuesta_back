import {ReadHora} from './read-conduce-control-hora-trabajador.dto';
import {Viajes } from './read-conduce-control-viaje-trabajador.dto';
import {Transporte } from './read-conduce-transporte-equipo-trabajador.dto';
export class ReadReportTrabajadorConduceDto {

    controlHora: ReadHora[];
    controlViaje: Viajes[];
    controlTransporte: Transporte[];

}
