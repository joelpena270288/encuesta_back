import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCombustibleDto } from './dto/create-combustible.dto';
import { UpdateCombustibleDto } from './dto/update-combustible.dto';
import { Combustible } from './entities/combustible.entity';
import { Repository } from 'typeorm';
import { CapacidadTanque } from './entities/capacidad-tanque.entity';

@Injectable()
export class CombustibleService {
  constructor(
  @Inject('COMBUSTIBLE_REPOSITORY')
    private combustibleRepository: Repository<Combustible>,
  ) {}
 async create(createCombustibleDto: CreateCombustibleDto): Promise<Combustible> {
  const capacidadTanque: CapacidadTanque = new CapacidadTanque();
    const newCombustible: Combustible = new Combustible();
    newCombustible.name = createCombustibleDto.name.toUpperCase();
    newCombustible.capacidadTanque = capacidadTanque;
    return await this.combustibleRepository.save(newCombustible);
  }

 async findAll(): Promise<Combustible[]> {
    return await this.combustibleRepository.find();
  }

 async findOne(id: string):Promise<Combustible> {
    return await this.combustibleRepository.findOne({where: {id: id}});
  }

 async update(id: string, updateCombustibleDto: UpdateCombustibleDto): Promise<Combustible> {
  
    const foundCombustible: Combustible = await this.combustibleRepository.findOne({where:{id: id}});
    if(!foundCombustible){
      throw new NotFoundException('No existe el combustible introducido');
    }
    foundCombustible.name = updateCombustibleDto.name.toUpperCase();
    foundCombustible.updatedAt = new Date();

    return await this.combustibleRepository.save(foundCombustible);
  }

 async remove(id: string): Promise<Combustible> {
  const foundCombustible: Combustible = await this.combustibleRepository.findOne({where:{id: id}});
  if(!foundCombustible){
    throw new NotFoundException('No existe el combustible introducido');
  }

  await this.combustibleRepository.delete(id);
  return foundCombustible;
   
  }
}
