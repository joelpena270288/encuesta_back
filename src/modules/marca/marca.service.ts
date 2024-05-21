import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { Marca } from './entities/marca.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Repository } from 'typeorm';

@Injectable()
export class MarcaService {
  constructor(
    @Inject('MARCA_REPOSITORY')
    private marcaRepository: Repository<Marca>,
  ) {}
 async create(createMarcaDto: CreateMarcaDto):Promise<Marca> {
  const foundMarca: Marca = await this.marcaRepository.findOne({where: {name: createMarcaDto.name.toUpperCase()}});
 if(foundMarca){
  foundMarca.status = Status.ACTIVO;
  return await this.marcaRepository.save(foundMarca);
 }else{
  const newMarca: Marca = new Marca();
  newMarca.name = createMarcaDto.name.toUpperCase();
    return await this.marcaRepository.save(newMarca);
 }
  }

 async findAll():Promise<Marca[]> {
    return await this.marcaRepository.find({where: {status: Status.ACTIVO}});
  }

 async findOne(id: string):Promise<Marca> {

    const findMarca: Marca = await this.marcaRepository.findOne({
      where: { id: id },
    });
    if (!findMarca) {
      throw new NotFoundException('No existe la marca');
    }
    return findMarca;
  }

 async update(id: string, updateMarcaDto: UpdateMarcaDto):Promise<Marca> {
    const findMarca: Marca = await this.marcaRepository.findOne({
      where: { id: id },
    });
    if (!findMarca) {
      throw new NotFoundException('No existe la marca');
    }
    findMarca.name = updateMarcaDto.name.toUpperCase();
    return await this.marcaRepository.save(findMarca);
  }

 async remove(id: string):Promise<Marca> {
    const findMarca: Marca = await this.marcaRepository.findOne({
      where: { id: id },
    });
    if (!findMarca) {
      throw new NotFoundException('No existe la marca');
    }
    findMarca.status = Status.INACTIVO;
    return await this.marcaRepository.save(findMarca);
  }
}
