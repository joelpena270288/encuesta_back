import { Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Conduce } from '../conduce/entities/conduce.entity';
import { Filtro } from './dto/filto.dto';
import { ReadReportCombustibleDTO } from './dto/read-report-combustible.dto';
import { StatusProyecto } from '../proyecto/status.enum';
import { EstatusConduce } from '../conduce/status.enum';

@Injectable()
export class ReportCombustibleService {
  constructor(
    @Inject('CONDUCE_REPOSITORY')
    private conduceRepository: Repository<Conduce>,
  ) {}
  async getReport(filtro: Filtro): Promise<ReadReportCombustibleDTO[]> {
    const readReportCombustible: ReadReportCombustibleDTO[] = [];
    const listConduce: Conduce[] = await this.conduceRepository
      .createQueryBuilder('conduce')
      .orderBy('conduce.createdAt',"DESC" )
      .innerJoinAndSelect('conduce.proyecto', 'proyecto')
      .innerJoinAndSelect('conduce.empleado', 'empleado')
      .innerJoinAndSelect('conduce.servicio', 'servicio')
      .innerJoinAndSelect('conduce.equipo', 'equipo')
      .innerJoinAndSelect('equipo.marca', 'marca')
      .innerJoinAndSelect('proyecto.cliente', 'cliente')
      .where('conduce.createdAt >= :start', {
        start: filtro.start + ' 00:00:00',
      })
      .andWhere('conduce.createdAt  <= :end', { end: filtro.end + ' 23:59:00' })
      .andWhere('conduce.status !=:status', {
        status: EstatusConduce.CANCELADO,
      })
      .andWhere('proyecto.status != :estado', {
        estado: StatusProyecto.CANCELADO,
      })
      .andWhere('equipo.id = :idequipo', { idequipo: filtro.idequipo })
      .getMany();

    if (listConduce) {
      for (let index = 0; index < listConduce.length; index++) {
        const newReport: ReadReportCombustibleDTO =
          new ReadReportCombustibleDTO();
        newReport.consecutivo = listConduce[index].consecutivo;
        newReport.consumocombustible =
          listConduce[index].cantidadConsummoCombustible;
        newReport.equipo =
          listConduce[index].equipo.ficha +
          ' - ' +
          listConduce[index].equipo.modelo +
          ' - ' +
          listConduce[index].equipo.marca.name +
          ' - ' +
          listConduce[index].equipo.placa;
        newReport.horafinal = listConduce[index].horaFin;
        newReport.horainicial = listConduce[index].horaInicio;
        newReport.nombreempleado =
          listConduce[index].empleado.name +
          ' ' +
          listConduce[index].empleado.lastname;
        newReport.proyecto = listConduce[index].proyecto.name;
        newReport.cantidadHorasReportadasEquipo =
          listConduce[index].horasreportadasequipo;
        newReport.cantidadHorasReportadasTrabajador =
          listConduce[index].horasreportadastrabajado;
          newReport.servicio =  listConduce[index].servicio.name;
        readReportCombustible.push(newReport);
      }
    }
    return readReportCombustible;
  }
}
