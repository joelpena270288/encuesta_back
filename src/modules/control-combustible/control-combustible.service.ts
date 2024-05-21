import { Inject, Injectable } from '@nestjs/common';
import {Filtro} from './dto/filtro.dto';
import {ReadControlCombustibleDto} from './dto/read-control-combustible.dto';
import { Repository } from 'typeorm';
import { ConsumoCombustible } from '../consumo_combustible/entities/consumo_combustible.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import * as moment from 'moment';
@Injectable()
export class ControlCombustibleService {
  constructor(
    @Inject('CONSUMOCOMBUSTIBLE_REPOSITORY')
    private consumoRepository: Repository<ConsumoCombustible>,
  ) {}
  async getReport(filtro: Filtro): Promise<ReadControlCombustibleDto[]> {
    const readControlCombustible: ReadControlCombustibleDto[] = [];
    const consumos: ConsumoCombustible[] = await this.consumoRepository
      .createQueryBuilder('consumo')
      .orderBy('consumo.fecha', 'ASC')
      .innerJoinAndSelect('consumo.equipo', 'equipo')
      .addOrderBy('equipo.ficha')
      .innerJoinAndSelect('consumo.combustible', 'combustible')
      .innerJoinAndSelect('equipo.marca', 'marca')
      .where('consumo.fecha >= :start', {
        start: filtro.start + ' 00:00:00',
      })
      .andWhere('consumo.fecha  <= :end', { end: filtro.end + ' 23:59:00' })
      .andWhere('consumo.status !=:status', {
        status: Status.INACTIVO,
      }).getMany();
      
     if(consumos){
      for (let index = 0; index < consumos.length; index++) {
       
        const newreadControlCombustible: ReadControlCombustibleDto = new ReadControlCombustibleDto;
          newreadControlCombustible.cantidad = consumos[index].galones;
          newreadControlCombustible.equipo = consumos[index].equipo.ficha + ' - ' +consumos[index].equipo.modelo + ' - ' + consumos[index].equipo.marca.name + ' - ' + consumos[index].equipo.placa;
          newreadControlCombustible.fecha = moment( consumos[index].fecha).format( "YYYY-MM-DD"); 
          newreadControlCombustible.combustible = consumos[index].combustible.name;
          readControlCombustible.push(newreadControlCombustible);
      }

     }

   
    return readControlCombustible;
  }
}
