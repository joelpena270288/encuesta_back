import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Cargo } from './entities/cargo.entity';
import { Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class CargoService {
  constructor(
    @Inject('CARGO_REPOSITORY')
    private cargoRepository: Repository<Cargo>,
  ) {}
 async create(createCargoDto: CreateCargoDto): Promise<Cargo> {
  const foundCargo: Cargo =  await this.cargoRepository.findOne({where:{name: createCargoDto.name.toUpperCase()}});
  if(foundCargo){
    foundCargo.status = Status.ACTIVO;
    return await this.cargoRepository.save(foundCargo);
  }else{
  const newCargo = new Cargo;
  newCargo.name = createCargoDto.name.toUpperCase();
  newCargo.descripcion = createCargoDto.descripcion;
  
  return await this.cargoRepository.save(newCargo);
  }
  }

 async findAll(): Promise<Cargo[]> {
    return await this.cargoRepository.find({where:{status: Status.ACTIVO}});
  }

 async findOne(id: string): Promise<Cargo> {
  return await this.cargoRepository.findOne({where:{id: id}});
  }

 async update(id: string, updateCargoDto: UpdateCargoDto): Promise<Cargo> {
  const findCargo: Cargo = await this.cargoRepository.findOne({where:{id: id}});
  if(!findCargo){
    throw new NotFoundException("El cargo no existe");
  }
   findCargo.name = updateCargoDto.name.toUpperCase();
   findCargo.descripcion = updateCargoDto.descripcion;
   findCargo.updatedAt = new Date();
   return await this.cargoRepository.save(findCargo);
  }

 async remove(id: string): Promise<Cargo> {
    const findCargo: Cargo = await this.cargoRepository.findOne({where:{id: id}});
    if(!findCargo){
      throw new NotFoundException("El cargo no existe");
    }
    findCargo.status = Status.INACTIVO;
    return await this.cargoRepository.save(findCargo);
  }
}
