import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntidadDto } from './dto/create-entidad.dto';
import { UpdateEntidadDto } from './dto/update-entidad.dto';
import { Entidad } from './entities/entidad.entity';
import { Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class EntidadService {
  constructor(
    @Inject('ENTIDAD_REPOSITORY')
    private entidadRepository: Repository<Entidad>,
  ) {}
  async create(createEntidadDto: CreateEntidadDto): Promise<Entidad> {
 const foundEntidad: Entidad = await this.entidadRepository.findOne({where:{name: createEntidadDto.name.toUpperCase()}});  
if(foundEntidad){
  if(foundEntidad.status == Status.ACTIVO){
    throw new BadRequestException('La Entidad está creada');
   }else{
    foundEntidad.status = Status.ACTIVO;
    foundEntidad.updatedAt = new Date();
    foundEntidad.rnc = createEntidadDto.rnc;
    return await this.entidadRepository.save(foundEntidad);

   }


  }
     const newEntidad: Entidad = new Entidad();
     newEntidad.name = createEntidadDto.name.toUpperCase();
     newEntidad.rnc = createEntidadDto.rnc;
     newEntidad.status = Status.ACTIVO;
     return await this.entidadRepository.save(newEntidad);
  }

 async findAll(): Promise<Entidad[]> {
    return await this.entidadRepository.find({where: {status: Status.ACTIVO}});
  }

async  findOne(id: string): Promise<Entidad> {
    return await this.entidadRepository.findOne({where:{id: id}});
  }

 async update(id: string, updateEntidadDto: UpdateEntidadDto):Promise<Entidad> {
  const foundEntidad: Entidad = await this.entidadRepository.findOne({where:{id: id}});
   foundEntidad.name = updateEntidadDto.name.toUpperCase();
   foundEntidad.rnc = updateEntidadDto.rnc;
   foundEntidad.updatedAt = new Date();


    return await this.entidadRepository.save(foundEntidad);
  }

async remove(id: string): Promise<Entidad> {
  const foundEntidad: Entidad = await this.entidadRepository.findOne({where:{id: id }});  
if(!foundEntidad){
  throw new NotFoundException('No existe la Entidad Introducida');
}
foundEntidad.status = Status.INACTIVO;
foundEntidad.updatedAt = new Date();
return await this.entidadRepository.save(foundEntidad);
  }
}
