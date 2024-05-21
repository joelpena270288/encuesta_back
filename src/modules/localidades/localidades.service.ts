import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';
import { Localidad } from './entities/localidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalidadesService {
  constructor(
    @Inject('LOCALIDAD_REPOSITORY')
    private localidadRepository: Repository<Localidad>,
  ) {}
  async create(createLocalidadeDto: CreateLocalidadeDto): Promise<Localidad> {
    const newlocalidad: Localidad = new Localidad();
    newlocalidad.name = createLocalidadeDto.name.toUpperCase();
    const createdLocalidad: Localidad =
      await this.localidadRepository.save(newlocalidad);
    return createdLocalidad;
  }

  async findAll(): Promise<Localidad[]> {
    return await this.localidadRepository.find();
  }

  async findOne(id: string): Promise<Localidad> {
    const findLocalidad: Localidad = await this.localidadRepository.findOne({where:{id:id}});

    if (!findLocalidad) {
      throw new NotFoundException('No existe la localidad enviada');
    }

    return findLocalidad;
  }

 async update(id: string, updateLocalidadeDto: UpdateLocalidadeDto): Promise<Localidad> {
    const findLocalidad: Localidad = await this.localidadRepository.findOne({where:{id:id}});
    if (!findLocalidad) {
      throw new NotFoundException('No existe la localidad enviada');
    }
    findLocalidad.name = updateLocalidadeDto.name.toUpperCase();
    findLocalidad.updatedAt = new Date();
    return await this.localidadRepository.save(findLocalidad);
  }

 async remove(id: string): Promise<Localidad> {
  const findLocalidad: Localidad = await this.localidadRepository.findOne({where:{id:id}});
  if (!findLocalidad) {
    throw new NotFoundException('No existe la localidad enviada');
  }
    return await this.localidadRepository.remove(findLocalidad);
  }
}
