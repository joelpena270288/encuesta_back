import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVendedorDto } from './dto/create-vendedor.dto';
import { UpdateVendedorDto } from './dto/update-vendedor.dto';
import { Repository } from 'typeorm';
import { Log } from '../log/entities/log.entity';
import { Vendedor } from './entities/vendedor.entity';
import { User } from '../users/entities/user.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { Grupo } from '../grupo/entities/grupo.entity';
@Injectable()
export class VendedorService {
  constructor(
    @Inject('VENDEDOR_REPOSITORY')
    private vendedorRepository: Repository<Vendedor>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('GRUPO_REPOSITORY')
    private grupoRepository: Repository<Grupo>
  ) {}
 async create(createVendedorDto: CreateVendedorDto,user: User): Promise<Vendedor> {
  const   found: Vendedor = await this.vendedorRepository.findOne({where:{documento: createVendedorDto.documento.toUpperCase()}});
 if(found){

  found.status = Status.ACTIVO;
await this.vendedorRepository.save(found);
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Activar';
  log.entidad = 'Vendedor';
  log.mensaje = 'Activo el vendedor: ' +  found.documento + " " +  found.name + " " + found.lastname   ;
  await this.logRepository.save(log);
  return found;
 }else{
const foundGrupo: Grupo = await this.grupoRepository.findOne({where: {id: createVendedorDto.idGrupo}});
if(!foundGrupo){
  throw new NotFoundException('El grupo introducido no es correcto')
}
  const newVendedor = new Vendedor();
  newVendedor.address = createVendedorDto.address;
  newVendedor.documento = createVendedorDto.documento;
  newVendedor.grupo =  foundGrupo;
  newVendedor.lastname = createVendedorDto.lastname;
  newVendedor.name = createVendedorDto.name;
  newVendedor.phone = createVendedorDto.phone;
  await this.vendedorRepository.save(newVendedor);
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Crear';
  log.entidad = 'Vendedor';
  log.mensaje = 'Creo el vendedor: ' +  newVendedor.documento + " " +  newVendedor.name + " " + newVendedor.lastname  + " En el Grupo: " + foundGrupo.name ;
  await this.logRepository.save(log);
  
return newVendedor;
 }

  }

 async findAll(): Promise<Vendedor[]> {
    return  await this.vendedorRepository.find({where:{status: Status.ACTIVO}});
  }

async  findOne(id: string): Promise<Vendedor> {
    const found: Vendedor = await this.vendedorRepository.findOne({where: {id: id}});
    if(!found){
      throw new NotFoundException("No se encontro el vendedor introducido");
    }
    return found;
  }

 async update(id: string, updateVendedorDto: UpdateVendedorDto,user: User):Promise<Vendedor> {
   const found: Vendedor = await this.vendedorRepository.findOne({where: {id: id}});
   if(!found){
    throw new NotFoundException("No se encontro el ve4ndedor introducido");
   }
   const foundGrupo: Grupo = await this.grupoRepository.findOne({where:{id: updateVendedorDto.idGrupo}});
   if(!foundGrupo){
    throw new NotFoundException("El grupo introducido no es valido");
   }
   const log: Log = new Log();
   log.usuario = user.username;
   log.accion = 'Activar';
   log.entidad = 'Vendedor';
   log.mensaje = 'Modifico el vendedor: ' +  found.documento + " " +  found.name + " " + found.lastname + " " + "Grupo: " + found.grupo.name ;
     await this.logRepository.save(log);
    found.address = updateVendedorDto.address;
    found.documento = updateVendedorDto.documento;
    found.grupo =  foundGrupo;
    found.lastname = updateVendedorDto.lastname;
    found.name = updateVendedorDto.name;
    found.phone = updateVendedorDto.phone;
    found.updatedAt = new Date();
   return await this.vendedorRepository.save(found);

  }

 async remove(id: string, user: User): Promise<Vendedor> {
  const found: Vendedor = await this.vendedorRepository.findOne({where: {id: id}});
  if(!found){
   throw new NotFoundException("No se encontro el ve4ndedor introducido");
  }
 
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Desactivar';
  log.entidad = 'Vendedor';
  log.mensaje = 'Desactivo el vendedor: ' +  found.documento + " " +  found.name + " " + found.lastname  ;
    await this.logRepository.save(log);
  found.status = Status.INACTIVO;
   found.updatedAt = new Date();
  return await this.vendedorRepository.save(found);
  }
}
