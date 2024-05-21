import { Inject, Injectable } from '@nestjs/common';
import {Filtro} from './dto/filto.dto';
import { ReadHora} from './dto/read-conduce-control-hora-trabajador.dto';
import {Viajes} from './dto/read-conduce-control-viaje-trabajador.dto';
import {Transporte} from './dto/read-conduce-transporte-equipo-trabajador.dto';
import { ReadReportTrabajadorConduceDto} from './dto/read-report-trabajador-conduce.dto';
import { Conduce } from '../conduce/entities/conduce.entity';
import { Repository } from 'typeorm';
import { StatusProyecto } from '../proyecto/status.enum';
import { EstatusConduce } from '../conduce/status.enum';



@Injectable()
export class ReportTrabajadorConduceService {
  constructor(
  @Inject('CONDUCE_REPOSITORY')
  private conduceRepository: Repository<Conduce>,
 
 
) {}
async  getReport(filtro: Filtro):Promise<ReadReportTrabajadorConduceDto> {
  const  readReportTrabajadorConduceDto: ReadReportTrabajadorConduceDto = new ReadReportTrabajadorConduceDto();
  const listConduce: Conduce[] = await this.conduceRepository.createQueryBuilder('conduce')
  .orderBy('conduce.createdAt',"DESC" )
  .innerJoinAndSelect('conduce.proyecto','proyecto')  
  .innerJoinAndSelect('conduce.empleado','empleado')
  .innerJoinAndSelect('conduce.equipo','equipo')
  .innerJoinAndSelect('proyecto.cliente','cliente')  
  .where('conduce.createdAt >= :start',{start: filtro.start+' 00:00:00'}) 
  .andWhere('conduce.createdAt  <= :end',{end: filtro.end+' 23:59:00'})
  .andWhere('conduce.status !=:status',{status: EstatusConduce.CANCELADO})
  .andWhere('proyecto.status != :estado',{estado: StatusProyecto.CANCELADO})
  .andWhere('empleado.id = :idempleado',{idempleado:  filtro.idempleado})
  .getMany();

  if(listConduce){
    
 
  readReportTrabajadorConduceDto.controlHora = [];
  readReportTrabajadorConduceDto.controlTransporte = [];
  readReportTrabajadorConduceDto.controlViaje = [];

    for (let index = 0; index < listConduce.length; index++) {
    switch (listConduce[index].name) {
      case 'CONTROLVIAJE':
        {
          const viajes: Viajes = new Viajes();
          viajes.ajuste =  listConduce[index].proyecto.ajuste;
          viajes.cantidadHora = listConduce[index].horas;
          viajes.cantidadViaje = listConduce[index].cantViajes;
          viajes.cliente = listConduce[index].proyecto.cliente.nombre;
          viajes.consecutivo = listConduce[index].consecutivo;
          viajes.desde = listConduce[index].desde;
          viajes.equipo = listConduce[index].equipo.ficha;
          viajes.hasta = listConduce[index].hasta;
          viajes.horaFin = listConduce[index].horaFin;
          viajes.horaInicio = listConduce[index].horaInicio;
          viajes.proyecto = listConduce[index].proyecto.name;
          viajes.volumen = listConduce[index].metrosCubicos;
          viajes.fecha = listConduce[index].createdAt;
          readReportTrabajadorConduceDto.controlViaje.push(viajes);
  
          break;
        }
        case 'CONTROLHORA':
          {
            const hora: ReadHora = new ReadHora();
           hora.ajuste = listConduce[index].proyecto.ajuste;
           hora.cantidadHora = listConduce[index].horas ;
           hora.cliente = listConduce[index].proyecto.cliente.nombre;
           hora.consecutivo = listConduce[index].consecutivo;
           hora.equipo = listConduce[index].equipo.ficha;
           hora.fecha = listConduce[index].createdAt;
           hora.horaFin = listConduce[index].horaFin;
           hora.horaInicio = listConduce[index].horaInicio;
           hora.proyecto = listConduce[index].proyecto.name;
           readReportTrabajadorConduceDto.controlHora.push(hora);


            break;
          }
          case 'TRANSPORTEEQUIPO':
            {
              const transport: Transporte = new Transporte();
              transport.ajuste = listConduce[index].proyecto.ajuste;
              transport.cantidadHora = listConduce[index].horas;
              transport.cantidadViaje = listConduce[index].cantViajes;
              transport.cliente = listConduce[index].proyecto.cliente.nombre;
              transport.consecutivo = listConduce[index].consecutivo;
              transport.desde = listConduce[index].desde;
              transport.equipo = listConduce[index].equipo.ficha;
              transport.hasta = listConduce[index].hasta;
              transport.horaFin = listConduce[index].horaFin;
              transport.horaInicio = listConduce[index].horaInicio;
              transport.proyecto = listConduce[index].proyecto.name;
              transport.fecha = listConduce[index].fecha;
              readReportTrabajadorConduceDto.controlTransporte.push(transport);
              break;
            }
       
    
     
    }
      
    }
  }

  return readReportTrabajadorConduceDto;
  }

  
 
}
