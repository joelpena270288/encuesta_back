import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUmDto } from './dto/create-um.dto';
import { UpdateUmDto } from './dto/update-um.dto';
import { Um } from './entities/um.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UmService {
  constructor(
    @Inject('UM_REPOSITORY')
    private umRepository: Repository<Um>,
  ) {}
  async create(createUmDto: CreateUmDto): Promise<Um> {
    const um: Um = new Um();
    um.name = createUmDto.name.toUpperCase();
    return await this.umRepository.save(um);
  }

  async findAll(): Promise<Um[]> {
    return await this.umRepository.find();
  }

  async findOne(id: string): Promise<Um> {
    return await this.umRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateUmDto: UpdateUmDto) {
    const foundUm: Um = await this.umRepository.findOne({ where: { id: id } });
    if (!foundUm) {
      throw new NotFoundException('El id introducido no es valido');
    }
    foundUm.name = updateUmDto.name.toUpperCase();
    foundUm.updatedAt = new Date();
    return await this.umRepository.save(foundUm);
  }

  async remove(id: string): Promise<Um> {
    const foundUm: Um = await this.umRepository.findOne({ where: { id: id } });
    if (!foundUm) {
      throw new NotFoundException('El id introducido no es valido');
    }
    return await this.umRepository.remove(foundUm);
  }
}
