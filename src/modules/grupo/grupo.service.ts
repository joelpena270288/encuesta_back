import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Grupo } from './entities/grupo.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { User } from '../users/entities/user.entity';
import { Log} from '../log/entities/log.entity';
import { Repository } from 'typeorm';

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
    if(found){
      found.status = Status.ACTIVO;
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
      await this.grupoRepository.save(newGrupo);
      const log: Log = new Log();
      log.usuario = user.username;
      log.accion = 'Nuevo';
      log.entidad = 'Grupo';
      log.mensaje = found.name;
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

    found.name = updateGrupoDto.name.toUpperCase();
    found.updatedAt  = new Date();

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
