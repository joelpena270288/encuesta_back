import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Equipo } from './entities/equipo.entity';

import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Marca } from '../marca/entities/marca.entity';
import {TipoEquipo} from '../tipo_equipo/entities/tipo_equipo.entity';

@Injectable()
export class EquiposService {
  constructor(
    @Inject('EQUIPO_REPOSITORY')
    private equipoRepository: Repository<Equipo>,
    @Inject('MARCA_REPOSITORY')
    private marcaRepository: Repository<Marca>,
	 @Inject('TIPOEQUIPO_REPOSITORY')
    private tipoRepository: Repository<TipoEquipo>,
  ) {}
  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const newEquipo = new Equipo();
    const findMarca: Marca = await this.marcaRepository.findOne({
      where: { id: createEquipoDto.idmarca },
    });
    if (!findMarca) {
      throw new NotFoundException('No existe la marca proporcionada');
    }
	 const findTipo: TipoEquipo = await this.tipoRepository.findOne({
      where: { id: createEquipoDto.idtipo},
    });
    if (!findTipo) {
      throw new NotFoundException('No existe el tipo de equipo proporcionada');
    }
	
    newEquipo.chasis = createEquipoDto.chasis.toUpperCase();
    newEquipo.anno = createEquipoDto.anno;
    newEquipo.color = createEquipoDto.color.toUpperCase();
    newEquipo.placa = createEquipoDto.placa.toUpperCase();
    newEquipo.marca = findMarca;
	newEquipo.tipo = findTipo;
	newEquipo.ficha = createEquipoDto.ficha.toUpperCase();
	newEquipo.metraje = createEquipoDto.metraje;
	newEquipo.modelo = createEquipoDto.modelo.toUpperCase();
    return await this.equipoRepository.save(newEquipo);
  }

  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepository.find({
      where: { status: Status.ACTIVO },
    });
  }

  async findOne(id: string): Promise<Equipo> {
    const foundEquipo: Equipo = await this.equipoRepository.findOne({
      where: { id: id },
    });
    if (!foundEquipo) {
      throw new NotFoundException('No existe el equipo');
    }
    return foundEquipo;
  }

  async update(id: string, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const foundEquipo: Equipo = await this.equipoRepository.findOne({
      where: { id: id },
    });
    if (!foundEquipo) {
      throw new NotFoundException('No existe el equipo');
    }
    const foundMarca: Marca = await this.marcaRepository.findOne({
      where: { id: updateEquipoDto.idmarca },
    });
    if(!foundMarca){
      throw new NotFoundException('No existe la marca');
    }
	 const findTipo: TipoEquipo = await this.tipoRepository.findOne({
      where: { id: updateEquipoDto.idtipo },
    });
    if (!findTipo) {
      throw new NotFoundException('No existe el tipo de equipo proporcionada');
    }
	
	
    foundEquipo.anno = updateEquipoDto.anno;
    foundEquipo.chasis = updateEquipoDto.chasis.toUpperCase();
    foundEquipo.placa = updateEquipoDto.placa.toUpperCase();
    foundEquipo.marca = foundMarca;
	foundEquipo.tipo = findTipo;
	foundEquipo.ficha = updateEquipoDto.ficha.toUpperCase();
	foundEquipo.metraje = updateEquipoDto.metraje;
	foundEquipo.modelo = updateEquipoDto.modelo.toUpperCase();
	 foundEquipo.color = updateEquipoDto.color.toUpperCase();
	foundEquipo.updatedAt = new Date();
    return await this.equipoRepository.save(foundEquipo);
  }

 async remove(id: string): Promise<Equipo> {
 const foundEquipo: Equipo = await this.equipoRepository.findOne({
      where: { id: id },
    });
    if (!foundEquipo) {
      throw new NotFoundException('No existe el equipo');
    }
   foundEquipo.status = Status.INACTIVO;
    return await this.equipoRepository.save(foundEquipo);
  }
}
