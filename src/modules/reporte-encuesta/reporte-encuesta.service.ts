import { Inject, Injectable } from '@nestjs/common';
import { CreateReporteEncuestaDto } from './dto/create-reporte-encuesta.dto';
import { IsNull, Repository } from 'typeorm';
import { Venta } from '../venta/entities/venta.entity';
import { ReadReporteEncuestaDto } from './dto/read-reporte-encuesta.dto';
import {Status} from '../../EntityStatus/entity.estatus.enum'
import { read } from 'fs';
import { isEmpty } from 'class-validator';

@Injectable()
export class ReporteEncuestaService {
  constructor(
    @Inject('VENTA_REPOSITORY')
    private ventaRepository: Repository<Venta>
   
  ) {}
 async create(createReporteEncuestaDto: CreateReporteEncuestaDto):Promise<ReadReporteEncuestaDto> {
  const readReporteEncuestaDto: ReadReporteEncuestaDto = new ReadReporteEncuestaDto(); 
  readReporteEncuestaDto.pendientes = [];
  readReporteEncuestaDto.completadas = await this.ventaRepository
    .createQueryBuilder('venta')    
    .innerJoinAndSelect('venta.vehiculo','vehiculo')
    .innerJoinAndSelect('venta.vendedor', 'vendedor')
    .innerJoinAndSelect('vendedor.grupo', 'grupo')
    .innerJoinAndSelect('venta.cuestionarios','cuestionario')
    .innerJoinAndSelect('cuestionario.encuesta','encuesta')

    .where('venta.fecha >= :start', {
      start: createReporteEncuestaDto.start + ' 00:00:00',
    })
    .andWhere('venta.fecha  <= :end', {
      end: createReporteEncuestaDto.end + ' 23:59:00',
    })
    .andWhere('venta.iduser = :idusario',{
      idusario: createReporteEncuestaDto.idUser})
    .andWhere('venta.status = :estado', {
      estado: Status.ACTIVO,
    })   
    .andWhere('encuesta.id = :idEncuesta', {
      idEncuesta: createReporteEncuestaDto.idEncuesta,
    })    
    .addOrderBy('venta.fecha','DESC')
    .getMany();
   const all:Venta[]  = await this.ventaRepository
    .createQueryBuilder('venta')    
    .innerJoinAndSelect('venta.vehiculo','vehiculo')
    .innerJoinAndSelect('venta.vendedor', 'vendedor')
    .innerJoinAndSelect('vendedor.grupo', 'grupo')
    .leftJoinAndSelect('venta.cuestionarios','cuestionario')
    .leftJoinAndSelect('cuestionario.encuesta','encuesta')
    
   
    .where('venta.fecha >= :start', {
      start: createReporteEncuestaDto.start + ' 00:00:00',
    })
    .andWhere('venta.fecha  <= :end', {
      end: createReporteEncuestaDto.end + ' 23:59:00',
    })
    .andWhere('venta.iduser = :idusario',{
      idusario: createReporteEncuestaDto.idUser})
    .andWhere('venta.status = :estado', {
      estado: Status.ACTIVO,
    }) 
    
    .addOrderBy('venta.fecha','DESC')
    .getMany();
   all.forEach(
    (element)=>{
if(element.cuestionarios.length===0){
  readReporteEncuestaDto.pendientes.push(element);

}else{
if(element.cuestionarios.find(x=>x.encuesta.id === createReporteEncuestaDto.idEncuesta)==null ){
  readReporteEncuestaDto.pendientes.push(element);
}

}

    }
   );
   return readReporteEncuestaDto;

  }

 
}
