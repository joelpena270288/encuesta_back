import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { Repository } from 'typeorm';
import { Kpi } from './entities/kpi.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { Log } from '../log/entities/log.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class KpiService {
  constructor(
    @Inject('KPI_REPOSITORY')
    private kpiRepository: Repository<Kpi>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>
  ) {}

 async create(createKpiDto: CreateKpiDto,user: User):Promise<Kpi> {
   const found: Kpi = await this.kpiRepository.findOne({where: {name: createKpiDto.name.toUpperCase()}});
   if(found){
    found.updatedAt = new Date();
    found.status = Status.ACTIVO;
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Habilitar';
    log.entidad = 'Kpi';
    log.mensaje = found.name;
    await this.logRepository.save(log);
    return await this.kpiRepository.save(found);

   }

   const kpi: Kpi = new Kpi();
   kpi.name = createKpiDto.name.toUpperCase();
   kpi.indiceDescuesto = createKpiDto.indiceDescuesto;
   kpi.indiceEncuesta = createKpiDto.indiceEncuesta;
   kpi.indiceVenta = createKpiDto.indiceVenta;
   const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Adicionar';
    log.entidad = 'Kpi';
    log.mensaje = kpi.name;
    await this.logRepository.save(log);
    return await this.kpiRepository.save(kpi);

   


 
  }

async  findAll(): Promise<Kpi[]> {
    return await this.kpiRepository.find({where: {status: Status.ACTIVO} });
  }

 async findOne(id: string): Promise<Kpi> {
 const found: Kpi = await this.kpiRepository.findOne({where:{id:id,status: Status.ACTIVO}});
 if(!found){
  throw new NotFoundException('No existe el Kpi introducido');
 }
 return found;
  }

 async update(id: string, updateKpiDto: UpdateKpiDto,user: User):Promise<Kpi> {
  const found: Kpi = await this.kpiRepository.findOne({where:{id:id,status: Status.ACTIVO}});
  if(!found){
   throw new NotFoundException('No existe el Kpi introducido');
  }
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Modificar';
  log.entidad = 'Kpi';
  log.mensaje = found.name;
  await this.logRepository.save(log);

found.indiceDescuesto = updateKpiDto.indiceDescuesto;
found.indiceEncuesta = updateKpiDto.indiceEncuesta;
found.indiceVenta = updateKpiDto.indiceVenta;
found.name = updateKpiDto.name.toUpperCase();
return await this.kpiRepository.save(found);

  }

 async remove(id: string,user: User):Promise<Kpi> {
  const found: Kpi = await this.kpiRepository.findOne({where:{id:id,status: Status.ACTIVO}});
  if(!found){
   throw new NotFoundException('No existe el Kpi introducido');
  }
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Deshabilitar';
  log.entidad = 'Kpi';
  log.mensaje = found.name;
  await this.logRepository.save(log);
  found.updatedAt = new Date();
  found.status = Status.INACTIVO;
  return await this.kpiRepository.save(found);
  }
}
