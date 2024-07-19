import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';
import { Log } from '../log/entities/log.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MarcaService {
  constructor(
    @Inject('MARCA_REPOSITORY')
    private marcaRepository: Repository<Marca>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>
  ) {}
  
 async create(createMarcaDto: CreateMarcaDto,user: User):Promise<Marca> {
  const found: Marca = await this.marcaRepository.findOne({where: {name: createMarcaDto.name.toUpperCase()}});
if(found){

  found.status = Status.ACTIVO;
  found.competencia = createMarcaDto.competencia;
  found.updatedAt = new Date();
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Activar';
  log.entidad = 'Marca';
  log.mensaje = found.name;
  await this.logRepository.save(log);

  return await this.marcaRepository.save(found);

}
const log: Log = new Log();
log.usuario = user.username;
log.accion = 'Nueva';
log.entidad = 'Marca';
log.mensaje = createMarcaDto.name;
await this.logRepository.save(log);
const marca: Marca = new Marca();
marca.name = createMarcaDto.name.toUpperCase();
marca.competencia = createMarcaDto.competencia;
return await this.marcaRepository.save(marca);

  }

async findAll():Promise<Marca[]> {
    return await this.marcaRepository.find({where:{status: Status.ACTIVO}});
  }

 async findOne(id: string):Promise<Marca> {
  
  const found: Marca = await this.marcaRepository.findOne({where: {id: id}});
  if(!found){
    throw new NotFoundException('La marca introducida no esta disponible')
  }
return found;
  }

 async update(id: string, updateMarcaDto: UpdateMarcaDto,user: User):Promise<Marca> {
   
  const found: Marca = await this.marcaRepository.findOne({where: {id: id}});
  if(!found){
    throw new NotFoundException('La marca introducida no esta disponible')
  }
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Editada';
  log.entidad = 'Marca';
  log.mensaje = found.name;
  await this.logRepository.save(log);
found.name = updateMarcaDto.name.toUpperCase();
found.competencia = updateMarcaDto.competencia;
found.updatedAt = new Date();

  
  return await this.marcaRepository.save(found);
  }

 async remove(id: string, user:User):Promise<Marca> {
    const found: Marca = await this.marcaRepository.findOne({where: {id: id}});
  if(!found){
    throw new NotFoundException('La marca introducida no esta disponible')
  }

    const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Deshabilitada';
  log.entidad = 'Marca';
  log.mensaje = found.name;
  await this.logRepository.save(log); 
found.status = Status.INACTIVO;
found.updatedAt = new Date();
return await this.marcaRepository.save(found);
  }
}
