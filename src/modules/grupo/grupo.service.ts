import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { User } from '../users/entities/user.entity';
import { Log} from '../log/entities/log.entity';
import { Repository } from 'typeorm';
import { RangoDescuesto } from './entities/rango-descuesto.entity';
import { RangoEncuesta } from './entities/rango-encuesta.entity';
import { RangoVenta } from './entities/rango-venta.entity';

@Injectable()
export class GrupoService {
  constructor(
    @Inject('GRUPO_REPOSITORY')
    private grupoRepository: Repository<Grupo>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>
  ) {}
  
 async create(createGrupoDto: CreateGrupoDto,user: User): Promise<Grupo> {

    const found: Grupo = await this.grupoRepository.findOne({where:{
    name: createGrupoDto.name.toUpperCase()

    }})
   
    const rangosDescuentosList: RangoDescuesto[] = new Array<RangoDescuesto>();
   const rangosEncuestasList: RangoEncuesta[] = new Array<RangoEncuesta>();
   const rangosventasList: RangoVenta[] = new Array<RangoVenta>();
  for (let index = 0; index < createGrupoDto.rangosDescuestos.length; index++) {
    const rangoDescuento: RangoDescuesto = new RangoDescuesto();
        rangoDescuento.min = createGrupoDto.rangosDescuestos[index].min;
        rangoDescuento.max = createGrupoDto.rangosDescuestos[index].max;
        rangoDescuento.valor = createGrupoDto.rangosDescuestos[index].valor;
        rangosDescuentosList.push(rangoDescuento);
    
  }
  for (let index = 0; index < createGrupoDto.rangosEncuestas.length; index++) {
    const rangoEncuesta: RangoEncuesta = new RangoEncuesta();
          rangoEncuesta.min = createGrupoDto.rangosEncuestas[index].min;
          rangoEncuesta.max = createGrupoDto.rangosEncuestas[index].max;
          rangoEncuesta.valor = createGrupoDto.rangosEncuestas[index].valor;
        rangosEncuestasList.push(rangoEncuesta);
    
  }
  for (let index = 0; index < createGrupoDto.rangosVenta.length; index++) {
    const rangoVenta: RangoVenta = new RangoVenta();
          rangoVenta.min = createGrupoDto.rangosVenta[index].min;
          rangoVenta.max = createGrupoDto.rangosVenta[index].max;
          rangoVenta.valor = createGrupoDto.rangosVenta[index].valor;
          rangosEncuestasList.push(rangoVenta); 
    
  }

    if(found){
      found.status = Status.ACTIVO;
      found.updatedAt = new Date();
     
      found.rangoDescueto = rangosDescuentosList;
      found.rangoEncuesta = rangosEncuestasList;
      found.rangoVenta = rangosventasList;

      await this.grupoRepository.save(found);
      const log: Log = new Log();
      log.usuario = user.username;
      log.accion = 'Activar';
      log.entidad = 'Grupo';
      log.mensaje = found.name;
      await this.logRepository.save(log);
      return found;

    }else{
      const newGrupo: Grupo = new Grupo();
      newGrupo.name = createGrupoDto.name.toUpperCase();
      newGrupo.rangoDescueto = rangosDescuentosList;
      newGrupo.rangoEncuesta = rangosEncuestasList;
      newGrupo.rangoVenta = rangosventasList;
      await this.grupoRepository.save(newGrupo);
      const log: Log = new Log();
      log.usuario = user.username;
      log.accion = 'Nuevo';
      log.entidad = 'Grupo';
      log.mensaje = newGrupo.name;
      await this.logRepository.save(log);
      return newGrupo;
    }  
    
   
  }

 async findAll():Promise<Grupo[]> {
    return  await this.grupoRepository.find({where:{status: Status.ACTIVO}});
  }

 async findOne(id: string): Promise<Grupo> {
    return await this.grupoRepository.findOne({where:{id: id}});
  }

 async update(id: string, updateGrupoDto: UpdateGrupoDto,user: User):Promise<Grupo> {
    const found: Grupo = await this.grupoRepository.findOne({where: {id: id}});
    if(!found){
      throw new NotFoundException('No se encontro el grupo suministrado');
    }
    const rangosDescuentosList: RangoDescuesto[] = new Array<RangoDescuesto>();
    const rangosEncuestasList: RangoEncuesta[] = new Array<RangoEncuesta>();
    const rangosventasList: RangoVenta[] = new Array<RangoVenta>();
   
    for (let index = 0; index < updateGrupoDto.rangosDescuestos.length; index++) {
     const rangoDescuento: RangoDescuesto = new RangoDescuesto();
         rangoDescuento.min = updateGrupoDto.rangosDescuestos[index].min;
         rangoDescuento.max = updateGrupoDto.rangosDescuestos[index].max;
         rangoDescuento.valor = updateGrupoDto.rangosDescuestos[index].valor;
         rangosDescuentosList.push(rangoDescuento);
     
   }
   for (let index = 0; index < updateGrupoDto.rangosEncuestas.length; index++) {
     const rangoEncuesta: RangoEncuesta = new RangoEncuesta();
           rangoEncuesta.min = updateGrupoDto.rangosEncuestas[index].min;
           rangoEncuesta.max = updateGrupoDto.rangosEncuestas[index].max;
           rangoEncuesta.valor = updateGrupoDto.rangosEncuestas[index].valor;
         rangosEncuestasList.push(rangoEncuesta);
     
   }
   for (let index = 0; index < updateGrupoDto.rangosVenta.length; index++) {
     const rangoVenta: RangoVenta = new RangoVenta();
           rangoVenta.min = updateGrupoDto.rangosVenta[index].min;
           rangoVenta.max = updateGrupoDto.rangosVenta[index].max;
           rangoVenta.valor = updateGrupoDto.rangosVenta[index].valor;
           rangosEncuestasList.push(rangoVenta); 
     
   }

    found.name = updateGrupoDto.name.toUpperCase();
    found.updatedAt  = new Date();
    found.rangoDescueto = rangosDescuentosList;
    found.rangoEncuesta = rangosEncuestasList;
    found.rangoVenta = rangosventasList;

    await this.grupoRepository.save(found);
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Editar';
    log.entidad = 'Grupo';
    log.mensaje = found.name;
    await this.logRepository.save(log);
  return found;
   
  }

 async remove(id: string, user: User):Promise<Grupo> {
    const found: Grupo = await this.grupoRepository.findOne({where: {id: id}});
    if(!found){
      throw new NotFoundException('No se encontro el grupo suministrado');
    }
    found.status = Status.INACTIVO;
    await this.grupoRepository.save(found);
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Desabilitar';
    log.entidad = 'Grupo';
    log.mensaje = found.name;
    await this.logRepository.save(log);
    return found;
  }
}
