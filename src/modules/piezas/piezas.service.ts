import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePiezaDto } from './dto/create-pieza.dto';
import { UpdatePiezaDto } from './dto/update-pieza.dto';
import { Pieza } from './entities/pieza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PiezasService {
  constructor(
    @Inject('PIEZA_REPOSITORY')
    private piezaRepository: Repository<Pieza>,
   
  ) {}
 async create(createPiezaDto: CreatePiezaDto):Promise<Pieza> {

    const newPieza: Pieza = new Pieza();
    newPieza.cantidad = createPiezaDto.cantidad;
    newPieza.descripcion = createPiezaDto.descripcion;
    newPieza.nombre = createPiezaDto.nombre;
    newPieza.serie = createPiezaDto.serie;

    return  await this.piezaRepository.save(newPieza);
  }

 async findAll(): Promise<Pieza[]> {
    return await this.piezaRepository.find();
  }

 async findOne(id: string):Promise<Pieza> {
    return  await this.piezaRepository.findOne({where:{id: id}});
  }

 async update(id: string, updatePiezaDto: UpdatePiezaDto): Promise<Pieza> {
  const foundPieza: Pieza = await this.piezaRepository.findOne({where:{id: id}});
  if(!foundPieza){
    throw new NotFoundException('No existe la pieza introducida');
  }
  foundPieza.cantidad = updatePiezaDto.cantidad;
  foundPieza.descripcion = updatePiezaDto.descripcion;
  foundPieza.nombre = updatePiezaDto.nombre;
  foundPieza.serie = updatePiezaDto.serie;

    return await this.piezaRepository.save(foundPieza);
  }

 async remove(id: string): Promise<Pieza> {
    const foundPieza: Pieza = await this.piezaRepository.findOne({where:{id: id}});
  if(!foundPieza){
    throw new NotFoundException('No existe la pieza introducida');
  }
  await this.piezaRepository.delete(id);
    return foundPieza;  
  }
}
