import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoImpuestosDgiDto } from './dto/create-tipo_impuestos_dgi.dto';
import { UpdateTipoImpuestosDgiDto } from './dto/update-tipo_impuestos_dgi.dto';
import {TipoImpuestosDgi} from './entities/tipo_impuestos_dgi.entity';
import { Repository } from 'typeorm';
import { Entidad } from '../entidad/entities/entidad.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class TipoImpuestosDgiService {
  constructor(
    @Inject('TIPOIMPUESTODGI_REPOSITORY')
    private tipoImpuestoDgiRepository: Repository<TipoImpuestosDgi>,
    @Inject('ENTIDAD_REPOSITORY')
    private entidadRepository: Repository<Entidad>,
  ) {}

 async create(createTipoImpuestosDgiDto: CreateTipoImpuestosDgiDto):Promise<TipoImpuestosDgi> {
  const  newImpuesto: TipoImpuestosDgi = new TipoImpuestosDgi();
  newImpuesto.name = createTipoImpuestosDgiDto.name.toUpperCase();
  const foundEntidad: Entidad = await this.entidadRepository.findOne({where:{id: createTipoImpuestosDgiDto.identidad}});
  if(!foundEntidad){
    throw new NotFoundException('La Entidad introducida no es valida');
  }
  newImpuesto.entidad = foundEntidad;
   
    const createdImpuesto: TipoImpuestosDgi =
      await this.tipoImpuestoDgiRepository.save(newImpuesto);
    return createdImpuesto;
   
  }

 async findAll():Promise<TipoImpuestosDgi[]> {
    return  await this.tipoImpuestoDgiRepository.find();
  }

 async findOne(id: string):Promise<TipoImpuestosDgi> {
  const foundImpuesto: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: id}});
  if(!foundImpuesto){
    throw new NotFoundException('No existe el tipo de Impuesto');
  } 
  
  return foundImpuesto;
  }

async  update(id: string, updateTipoImpuestosDgiDto: UpdateTipoImpuestosDgiDto):Promise<TipoImpuestosDgi> {
    const foundImpuesto: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: id}});
  if(!foundImpuesto){
    throw new NotFoundException('No existe el tipo de Impuesto');
  } 
  foundImpuesto.name = updateTipoImpuestosDgiDto.name.toUpperCase();
  const foundEntidad: Entidad = await this.entidadRepository.findOne({where:{id: updateTipoImpuestosDgiDto.identidad}});
  if(!foundEntidad){
    throw new NotFoundException('La Entidad introducida no es valida');
  }
  foundImpuesto.entidad = foundEntidad;
  foundImpuesto.updatedAt = new Date();
  return await this.tipoImpuestoDgiRepository.save(foundImpuesto);
  }

 async remove(id: string):Promise<TipoImpuestosDgi> {
    const foundImpuesto: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: id}});
    if(!foundImpuesto){
      throw new NotFoundException('No existe el tipo de Impuesto');
    } 
    foundImpuesto.updatedAt = new Date();
    foundImpuesto.status = Status.INACTIVO;
     return await this.tipoImpuestoDgiRepository.save(foundImpuesto);
  }
}
