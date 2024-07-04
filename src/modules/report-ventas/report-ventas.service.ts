import { Inject, Injectable } from '@nestjs/common';

import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Venta } from '../venta/entities/venta.entity';
import { FiltroFechaDto } from '../../filtro-fecha/filtro-fecha.dto';
@Injectable()
export class ReportVentasService {
  constructor(
    @Inject('VENTA_REPOSITORY')
    private ventaRepository: Repository<Venta>
   
  ) {}
async  create(filtro: FiltroFechaDto) {
    return await this.ventaRepository
    .createQueryBuilder('venta')
    
    .innerJoinAndSelect('venta.vehiculo','vehiculo')
    .innerJoinAndSelect('venta.vendedor', 'vendedor')
    .innerJoinAndSelect('vendedor.grupo', 'grupo')
    
    .where('venta.fecha >= :start', {
      start: filtro.start + ' 00:00:00',
    })

    .andWhere('venta.fecha  <= :end', {
      end: filtro.end + ' 23:59:00',
    })
    .addGroupBy('venta.id')
    .addGroupBy('vehiculo.id')
    .addGroupBy('vendedor.id')
    .addGroupBy('grupo.name')
    .addGroupBy('vendedor.name')
    .addOrderBy('venta.fecha','DESC')
    .getMany();

  }
  
  }

