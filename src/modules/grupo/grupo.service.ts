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
import { Kpi} from '../kpi/entities/kpi.entity';

@Injectable()
export class GrupoService {
  constructor(
    @Inject('GRUPO_REPOSITORY')
    private grupoRepository: Repository<Grupo>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
	 @Inject('KPI_REPOSITORY')
    private kpiRepository: Repository<Kpi>
  ) {}
  
 async create(createGrupoDto: CreateGrupoDto,user: User): Promise<Grupo> {

    const found: Grupo = await this.grupoRepository.findOne({where:{
    name: createGrupoDto.name.toUpperCase()

    }});
	const foundKpi: Kpi = await this.kpiRepository.findOne({where:{id: createGrupoDto.idKpi,status: Status.ACTIVO }});
	if(!foundKpi){
		  throw new NotFoundException('No se encontro el Kpi suministrado');
		
	}
   
    const rangosDescuentosList: RangoDescuesto[] = new Array<RangoDescuesto>();
   const rangosEncuestasList: RangoEncuesta[] = new Array<RangoEncuesta>();
   const rangosVentasList: RangoVenta[] = new Array<RangoVenta>();
  for (let index = 0; index < createGrupoDto.rangosDescuestos.length; index++) {
    const rangoDescuento: RangoDescuesto = new RangoDescuesto();
        rangoDescuento.min = createGrupoDto.rangosDescuestos[index].min;
        rangoDescuento.max = createGrupoDto.rangosDescuestos[index].max;
        rangoDescuento.valor = createGrupoDto.rangosDescuestos[index].valor;
        rangoDescuento.name = createGrupoDto.rangosDescuestos[index].name;
        rangosDescuentosList.push(rangoDescuento);
    
  }
  for (let index = 0; index < createGrupoDto.rangosEncuestas.length; index++) {
    const rangoEncuesta: RangoEncuesta = new RangoEncuesta();
          rangoEncuesta.min = createGrupoDto.rangosEncuestas[index].min;
          rangoEncuesta.max = createGrupoDto.rangosEncuestas[index].max;
          rangoEncuesta.valor = createGrupoDto.rangosEncuestas[index].valor;
          rangoEncuesta.name = createGrupoDto.rangosEncuestas[index].name;
        rangosEncuestasList.push(rangoEncuesta);
    
  }
  for (let index = 0; index < createGrupoDto.rangosVentas.length; index++) {
    const rangoVenta: RangoVenta = new RangoVenta();
          rangoVenta.min = createGrupoDto.rangosVentas[index].min;
          rangoVenta.max = createGrupoDto.rangosVentas[index].max;
          rangoVenta.valor = createGrupoDto.rangosVentas[index].valor;
          rangoVenta.name = createGrupoDto.rangosVentas[index].name;
          rangosVentasList.push(rangoVenta); 
    
  }

    if(found){
      found.status = Status.ACTIVO;
      found.updatedAt = new Date();
     
      found.rangoDescueto = rangosDescuentosList;
      found.rangoEncuesta = rangosEncuestasList;
      found.rangoVenta = rangosVentasList;

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
      newGrupo.rangoVenta = rangosVentasList;
      newGrupo.color = createGrupoDto.color;
	  newGrupo.kpi = foundKpi;
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
	const foundKpi: Kpi = await this.kpiRepository.findOne({where:{id: updateGrupoDto.idKpi,status: Status.ACTIVO }});
	if(!foundKpi){
		  throw new NotFoundException('No se encontro el Kpi suministrado');
		
	}
    const rangosDescuentosList: RangoDescuesto[] = new Array<RangoDescuesto>();
    const rangosEncuestasList: RangoEncuesta[] = new Array<RangoEncuesta>();
    const rangosVentasList: RangoVenta[] = new Array<RangoVenta>();
   
    for (let index = 0; index < updateGrupoDto.rangosDescuestos.length; index++) {
     const rangoDescuento: RangoDescuesto = new RangoDescuesto();
	     rangoDescuento.name = updateGrupoDto.rangosDescuestos[index].name.toUpperCase();
         rangoDescuento.min = updateGrupoDto.rangosDescuestos[index].min;
         rangoDescuento.max = updateGrupoDto.rangosDescuestos[index].max;
         rangoDescuento.valor = updateGrupoDto.rangosDescuestos[index].valor;
         rangosDescuentosList.push(rangoDescuento);
     
   }
   for (let index = 0; index < updateGrupoDto.rangosEncuestas.length; index++) {
     const rangoEncuesta: RangoEncuesta = new RangoEncuesta();
	      rangoEncuesta.name = updateGrupoDto.rangosEncuestas[index].name.toUpperCase();
           rangoEncuesta.min = updateGrupoDto.rangosEncuestas[index].min;
           rangoEncuesta.max = updateGrupoDto.rangosEncuestas[index].max;
           rangoEncuesta.valor = updateGrupoDto.rangosEncuestas[index].valor;
         rangosEncuestasList.push(rangoEncuesta);
     
   }
   for (let index = 0; index < updateGrupoDto.rangosVentas.length; index++) {
     const rangoVenta: RangoVenta = new RangoVenta();
	       rangoVenta.name = updateGrupoDto.rangosVentas[index].name.toUpperCase();
           rangoVenta.min = updateGrupoDto.rangosVentas[index].min;
           rangoVenta.max = updateGrupoDto.rangosVentas[index].max;
           rangoVenta.valor = updateGrupoDto.rangosVentas[index].valor;
           rangosVentasList.push(rangoVenta); 
     
   }

    found.name = updateGrupoDto.name.toUpperCase();
    found.updatedAt  = new Date();
    found.rangoDescueto = rangosDescuentosList;
    found.rangoEncuesta = rangosEncuestasList;
    found.rangoVenta = rangosVentasList;
    found.color = updateGrupoDto.color;
	found.kpi = foundKpi;

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
