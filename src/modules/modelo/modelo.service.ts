import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { Modelo } from './entities/modelo.entity';
import { Repository } from 'typeorm';
import { Marca } from '../marca/entities/marca.entity';
import { User } from '../users/entities/user.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';

import { Log } from '../log/entities/log.entity';

@Injectable()
export class ModeloService {
  constructor(
  @Inject('MODELO_REPOSITORY')
  private modeloRepository: Repository<Modelo>,
  @Inject('MARCA_REPOSITORY')
  private marcaRepository: Repository<Marca>,
  @Inject('LOG_REPOSITORY')
  private logRepository: Repository<Log>
) {}

async  create(createModeloDto: CreateModeloDto,user: User): Promise<Modelo> {
  const founMarca: Marca = await this.marcaRepository.findOne({where: {id: createModeloDto.idMarca }});
  if(!founMarca){
    throw new NotFoundException('No se encontro la marca suministrada');
  }

  const found: Modelo = await this.modeloRepository.findOne({where: {name: createModeloDto.name.toUpperCase()}});
  if(found){

    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Activar';
    log.entidad = 'Modelo';
    log.mensaje = found.name;
    await this.logRepository.save(log);

    found.marca = founMarca;
    found.status = Status.ACTIVO;
    found.competencia = createModeloDto.competencia;
    found.updatedAt = new Date();
    return await this.modeloRepository.save(found);

  }

  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Nuevo';
  log.entidad = 'Modelo';
  log.mensaje = createModeloDto.name;
  await this.logRepository.save(log);

  const modelo: Modelo = new Modelo();
  modelo.name = createModeloDto.name.toUpperCase();
  modelo.marca = founMarca;
  modelo.competencia = createModeloDto.competencia;
  return await this.modeloRepository.save(modelo);

  }

 async findAll():Promise<Modelo[]> {
    return await this.modeloRepository
	 .createQueryBuilder('modelo')
	 .orderBy('modelo.createdAt',"DESC" )
	 .innerJoinAndSelect('modelo.marca', 'marca')
	  .where('modelo.status = :estado', {
        estado: Status.ACTIVO,
      })
	   .getMany();
  }

 async findOne(id: string): Promise<Modelo> {
  const found: Modelo = await this.modeloRepository.findOne({where: {id: id}});
if(!found){
  throw new NotFoundException('No esta disponible en el sistema el modelo introducido');
}
return found;

  }

 async update(id: string, updateModeloDto: UpdateModeloDto, user: User):Promise<Modelo> {
    const founMarca: Marca = await this.marcaRepository.findOne({where: {id: updateModeloDto.idMarca }});
    if(!founMarca){
      throw new NotFoundException('No se encontro la marca suministrada');
    }
   
    const found: Modelo = await this.modeloRepository.findOne({where: {id: id}});
if(!found){
  throw new NotFoundException('No esta disponible en el sistema el modelo introducido');
}

const log: Log = new Log();
log.usuario = user.username;
log.accion = 'Editar';
log.entidad = 'Modelo';
log.mensaje = updateModeloDto.name;
await this.logRepository.save(log);
found.name = updateModeloDto.name.toUpperCase();
found.marca = founMarca;
found.competencia = updateModeloDto.competencia;
found.updatedAt = new Date();
return this.modeloRepository.save(found);
  


  }

async  remove(id: string,user:User): Promise<Modelo> {
    const found: Modelo = await this.modeloRepository.findOne({where: {id: id}});
    if(!found){
      throw new NotFoundException('No esta disponible en el sistema el modelo introducido');
    }

    const log: Log = new Log();
log.usuario = user.username;
log.accion = 'Deshabilitar';
log.entidad = 'Modelo';
log.mensaje = found.name;
await this.logRepository.save(log);
found.status = Status.INACTIVO;
found.updatedAt = new Date(); 
return await this.modeloRepository.save(found);
  
}
}
