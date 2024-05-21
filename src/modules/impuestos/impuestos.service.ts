import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImpuestoDto } from './dto/create-impuesto.dto';
import { UpdateImpuestoDto } from './dto/update-impuesto.dto';
import { Impuesto } from './entities/impuesto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImpuestosService {
  constructor(
    @Inject('IMPUESTO_REPOSITORY')
    private impuestoRepository: Repository<Impuesto>,
  ) {}

 async create(createImpuestoDto: CreateImpuestoDto): Promise<Impuesto> {
    const newImpuesto: Impuesto = new Impuesto();
    newImpuesto.name = createImpuestoDto.name.toUpperCase();
    newImpuesto.valor = createImpuestoDto.valor;
    newImpuesto.descripcion = createImpuestoDto.descripcion;
    const createdImpuesto: Impuesto =
      await this.impuestoRepository.save(newImpuesto);
    return createdImpuesto;
  }

 async findAll(): Promise<Impuesto[]> {
  return await this.impuestoRepository.find();
  }

 async findOne(id: string): Promise<Impuesto> {
    const findImpuesto: Impuesto = await this.impuestoRepository.findOne({where:{id:id}});

    if (!findImpuesto) {
      throw new NotFoundException('No existe el impuesto enviado');
    }

    return findImpuesto;
  }

 async update(id: string, updateImpuestoDto: UpdateImpuestoDto): Promise<Impuesto> {
    const findImpuesto: Impuesto = await this.impuestoRepository.findOne({where:{id:id}});
    if (!findImpuesto) {
      throw new NotFoundException('No existe el impuesto enviado');
    }
    findImpuesto.name = updateImpuestoDto.name.toUpperCase();
    findImpuesto.descripcion = updateImpuestoDto.descripcion;
    findImpuesto.valor = updateImpuestoDto.valor;

    return await this.impuestoRepository.save(findImpuesto);
  }

 async remove(id: string): Promise<Impuesto> {
  const findImpuesto: Impuesto = await this.impuestoRepository.findOne({where:{id:id}});
  if (!findImpuesto) {
    throw new NotFoundException('No existe el impuesto enviado');
  }
    return await this.impuestoRepository.remove(findImpuesto);
  }
}
