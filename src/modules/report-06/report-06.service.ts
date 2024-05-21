import { Inject, Injectable } from '@nestjs/common';
import { ReadReport06Dto } from './dto/read-report-06.dto';
import { Factura } from '../factura/entities/factura.entity';
import { Repository } from 'typeorm';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { StatusFactura } from '../factura/entities/fatura-status.enum';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';

import { GastosResumen } from './dto/gasto.dto';
import { StatusGasto } from '../gastos_empresas/entities/gasto-status.enum';
import * as moment from 'moment';
import { TipoDocumento } from '../provedor/dto/tipo-documento.enum';
import { NotaCredito } from '../nota_credito/entities/nota_credito.entity';
@Injectable()
export class Report06Service {
  constructor(
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
    @Inject('NOTACREDITO_REPOSITORY')
    private notaRepository: Repository<NotaCredito>,
  ) {}
  async getReport06(filtroFechaDto: FiltroFechaDto): Promise<ReadReport06Dto> {
    const readReport06Dto: ReadReport06Dto = new ReadReport06Dto();

    readReport06Dto.gastosResumen = [];

    const gastos: GastosEmpresa[] = await this.gastoRepository
      .createQueryBuilder('gasto')
      .orderBy('gasto.createdAt', 'ASC')
      .innerJoinAndSelect(
        'gasto.gastosItems',

        'gastoItem',
        'gastoItem.status = :estadoitem',
        { estadoitem: Status.ACTIVO },
      )
      .innerJoinAndSelect('gasto.provedor', 'provedor')
      .where('gasto.createdAt >= :start', {
        start: filtroFechaDto.start + ' 00:00:00',
      })
      .andWhere('gasto.createdAt  <= :end', {
        end: filtroFechaDto.end + ' 23:59:00',
      })
      .andWhere('gasto.status  != :estadogasto', {
        estadogasto: StatusGasto.CANCELADO,
      })
      .andWhere('gasto.NCF  != :ncf', { ncf: '' })

      .getMany();

    if (gastos) {
      for (let index = 0; index < gastos.length; index++) {
        const gastosResumen: GastosResumen = new GastosResumen();
        gastosResumen.subtotal = 0;
        gastosResumen.itbis = 0;
        gastosResumen.fecha = moment(gastos[index].createdAt).format(
          'YYYY-MM-DD',
        );
        gastosResumen.formapago = gastos[index].tipoPago;
        gastosResumen.servicio = gastos[index].descripcion;
        gastosResumen.ncf = gastos[index].NCF;
        gastosResumen.rnc = gastos[index].provedor.documento;
        gastosResumen.isc = parseFloat(
          gastos[index].impuestoselectivoconsumo.toString()
        );
        gastosResumen.propina = parseFloat(gastos[index].propina.toString());
        gastosResumen.cdt = parseFloat(gastos[index].impuestoclaro.toString());
        gastosResumen.retencion = gastos[index].retencion;
        gastosResumen.valorretencion = gastos[index].valorretencion;

        for (
          let jindex = 0;
          jindex < gastos[index].gastosItems.length;
          jindex++
        ) {
          gastosResumen.itbis =
            parseFloat(gastosResumen.itbis.toString()) +
            parseFloat(
              gastos[index].gastosItems[jindex].importeimpuesto.toString(),
            );
          gastosResumen.subtotal =
            parseFloat(gastosResumen.subtotal.toString()) +
            parseFloat(gastos[index].gastosItems[jindex].importe.toString());
        }
        gastosResumen.subtotal =
          parseFloat(gastosResumen.subtotal.toString()) -
          parseFloat(gastos[index].valordescuentoimporte.toString());
          gastosResumen.subtotal = parseFloat( gastosResumen.subtotal.toString()) * parseFloat(gastos[index].tasadgii.toString());
        gastosResumen.itbis =
          parseFloat(gastosResumen.itbis.toString()) -
          parseFloat(gastos[index].valordescuentoimpuesto.toString());
  gastosResumen.itbis = parseFloat (gastosResumen.itbis.toString()) * parseFloat(gastos[index].tasadgii.toString());

        gastosResumen.itbis.toFixed(2);
        gastosResumen.subtotal.toFixed(2);

        readReport06Dto.gastosResumen.push(gastosResumen);
      }
    }
    const notas: NotaCredito[] = await this.notaRepository
      .createQueryBuilder('nota')
      .orderBy('nota.createdAt', 'ASC')
      .innerJoinAndSelect(
        'nota.gastoempresa',

        'gastoempresa',
      )
      .innerJoinAndSelect('gastoempresa.provedor', 'provedor')

      .where('nota.fecha >= :start', {
        start: filtroFechaDto.start + ' 00:00:00',
      })
      .andWhere('nota.fecha  <= :end', {
        end: filtroFechaDto.end + ' 23:59:00',
      })
      .getMany();

    for (let index = 0; index < notas.length; index++) {
      const gastosResumen: GastosResumen = new GastosResumen();
      gastosResumen.formapago = 'CREDITO';
      gastosResumen.cdt = 0;
      gastosResumen.fecha = moment(notas[index].fecha).format('YYYY-MM-DD');
      gastosResumen.isc = 0;
      gastosResumen.itbis = notas[index].impuesto;
      gastosResumen.ncf = notas[index].ncf;
      gastosResumen.propina = 0;
      gastosResumen.rnc = notas[index].gastoempresa.provedor.documento;
      gastosResumen.servicio =
        'COSTOS (NOTA DE CRÉDITO NCF-' + notas[index].gastoempresa.NCF + ')';
      gastosResumen.subtotal = notas[index].importe;
      readReport06Dto.gastosResumen.push(gastosResumen);
    }

    return readReport06Dto;
  }
}
