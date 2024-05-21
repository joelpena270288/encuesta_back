import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ReadReportGastoDto } from './dto/read-report-gasto.dto';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { ConsumoCombustible } from '../consumo_combustible/entities/consumo_combustible.entity';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Repository } from 'typeorm';
import { EntradaCombustible } from '../entrada-combustible/entities/entrada-combustible.entity';
import { StatusGasto } from '../gastos_empresas/entities/gasto-status.enum';
@Injectable()
export class ReportGastoService {
  constructor(
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoempresaRepository: Repository<GastosEmpresa>,
    @Inject('ENTRADACOMBUSTIBLE_REPOSITORY')
    private entradacombustibleRepository: Repository<EntradaCombustible>,
  ) {}

  async getReport(filtroFechaDto: FiltroFechaDto): Promise<ReadReportGastoDto> {
    const readReportGastoDto: ReadReportGastoDto = new ReadReportGastoDto();
    readReportGastoDto.itbis_gasto_combustible = 0;
    readReportGastoDto.itbis_gasto_empresa = 0;
    readReportGastoDto.itbis_gasto_proyecto = 0;
    readReportGastoDto.sub_total_gasto_combustible = 0;
    readReportGastoDto.sub_total_gasto_empresa = 0;
    readReportGastoDto.sub_total_gasto_proyecto = 0;
    const gastos: GastosEmpresa[] = await this.gastoempresaRepository
      .createQueryBuilder('gasto')
      .orderBy('gasto.createdAt',"DESC" )
      .leftJoinAndSelect('gasto.proyecto', 'proyecto')
      .leftJoinAndSelect('gasto.gastosItems', 'gastosItems')
      .where('gasto.createdAt >= :start', {
        start: filtroFechaDto.start + ' 00:00:00',
      })
      .andWhere('gasto.createdAt  <= :end', {
        end: filtroFechaDto.end + ' 23:59:00',
      })
      .andWhere('gasto.status !=:status', { status: StatusGasto.CANCELADO })
      .getMany();

    const combustible: EntradaCombustible[] =
      await this.entradacombustibleRepository
        .createQueryBuilder('combustible')
        .where('combustible.fecha >= :start', {
          start: filtroFechaDto.start + ' 00:00:00',
        })
        .andWhere('combustible.fecha  <= :end', {
          end: filtroFechaDto.end + ' 23:59:00',
        })
        .andWhere('combustible.status =:status', { status: Status.ACTIVO })
        .getMany();
    if (gastos) {
      for (let index = 0; index < gastos.length; index++) {
        if (gastos[index].proyecto != null) {
          for (let iter = 0; iter < gastos[index].gastosItems.length; iter++) {
            readReportGastoDto.itbis_gasto_proyecto =
              parseFloat(readReportGastoDto.itbis_gasto_proyecto.toString()) +
              parseFloat(
                gastos[index].gastosItems[iter].importeimpuesto.toString(),
              );
            readReportGastoDto.sub_total_gasto_proyecto =
              parseFloat(
                readReportGastoDto.sub_total_gasto_proyecto.toString(),
              ) +
              parseFloat(gastos[index].gastosItems[iter].importe.toString());
          }
        } else {
          for (let iter = 0; iter < gastos[index].gastosItems.length; iter++) {
            readReportGastoDto.itbis_gasto_empresa =
              parseFloat(readReportGastoDto.itbis_gasto_empresa.toString()) +
              parseFloat(
                gastos[index].gastosItems[iter].importeimpuesto.toString(),
              );
            readReportGastoDto.sub_total_gasto_empresa =
              parseFloat(
                readReportGastoDto.sub_total_gasto_empresa.toString(),
              ) +
              parseFloat(gastos[index].gastosItems[iter].importe.toString());
          }
        }
      }
    }
    if (combustible) {
      for (let index = 0; index < combustible.length; index++) {
        readReportGastoDto.itbis_gasto_combustible =
          parseFloat(readReportGastoDto.itbis_gasto_combustible.toString()) +
          parseFloat(combustible[index].importeimpuesto.toString());
        readReportGastoDto.sub_total_gasto_combustible =
          parseFloat(
            readReportGastoDto.sub_total_gasto_combustible.toString(),
          ) + parseFloat(combustible[index].importe.toString());
      }
    }

    return readReportGastoDto;
  }
}
