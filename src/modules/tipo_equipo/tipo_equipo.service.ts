import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoEquipoDto } from './dto/create-tipo_equipo.dto';
import { UpdateTipoEquipoDto } from './dto/update-tipo_equipo.dto';
import { TipoEquipo } from './entities/tipo_equipo.entity';
import { Repository } from 'typeorm';

import { Status } from '../../EntityStatus/entity.estatus.enum';


@Injectable()
export class TipoEquipoService {
  constructor(
    @Inject('TIPOEQUIPO_REPOSITORY')
    private tipoEquipoRepository: Repository<TipoEquipo>,
  ) {}

 async create(createTipoEquipoDto: CreateTipoEquipoDto): Promise<TipoEquipo> {
  const foundTipoEquipo: TipoEquipo = await this.tipoEquipoRepository.findOne({where:{name: createTipoEquipoDto.name.toUpperCase()}});
if(foundTipoEquipo){
  foundTipoEquipo.status = Status.ACTIVO;
  return await this.tipoEquipoRepository.save(foundTipoEquipo);
}else{
  const newTipoEquipo: TipoEquipo  = new TipoEquipo();
  newTipoEquipo.name = createTipoEquipoDto.name.toUpperCase();
  
  
      return await this.tipoEquipoRepository.save(newTipoEquipo);
}

  }

 async findAll(): Promise<TipoEquipo[]> {
    return await this.tipoEquipoRepository.find({where:{status: Status.ACTIVO}});
  }

 async findOne(id: string): Promise<TipoEquipo> {
    return await this.tipoEquipoRepository.findOne({where:{id:id}});
  }

 async update(id: string, updateTipoEquipoDto: UpdateTipoEquipoDto):Promise<TipoEquipo> {
const findTipoEquipo: TipoEquipo = await this.tipoEquipoRepository.findOne({where:{id:id}});

if(!findTipoEquipo){
  throw new NotFoundException('No existe el tipo de equipo enviado');
}
findTipoEquipo.name = updateTipoEquipoDto.name.toUpperCase();
findTipoEquipo.updatedAt = new Date();

    return await this.tipoEquipoRepository.save(findTipoEquipo);
  }

 async  remove(id: string): Promise<TipoEquipo> {
  const findTipoEquipo: TipoEquipo = await this.tipoEquipoRepository.findOne({where:{id:id}});

if(!findTipoEquipo){
  throw new NotFoundException('No existe el tipo de equipo enviado');

}
findTipoEquipo.status = Status.INACTIVO;
    return await this.tipoEquipoRepository.save(findTipoEquipo);
  }
}
