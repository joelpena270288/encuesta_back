import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @Inject('EMPRESA_REPOSITORY')
    private empresaRepository: Repository<Empresa>,
  ) {}
  /*
  create(createEmpresaDto: CreateEmpresaDto) {
    return 'This action adds a new empresa';
  }*/
  /*
  findAll() {
    return `This action returns all empresa`;
  }*/

  async findOne(): Promise<Empresa> {
    return await this.empresaRepository.findOne({
      where: { idetificador: 'SIGLER' },
    });
  }

  async update(
    id: string,
    updateEmpresaDto: UpdateEmpresaDto,
  ): Promise<Empresa> {
    const foundEmpresa: Empresa = await this.empresaRepository.findOne({
      where: { id: id },
    });
    if (!foundEmpresa) {
      throw new NotFoundException('La empresa no existe');
    }
    foundEmpresa.updatedAt = new Date();
    foundEmpresa.direccion = updateEmpresaDto.direccion;
    foundEmpresa.logo = updateEmpresaDto.logo;
    foundEmpresa.nombre = updateEmpresaDto.nombre;
    foundEmpresa.rnc = updateEmpresaDto.rnc;
    foundEmpresa.telefono = updateEmpresaDto.telefono;
	foundEmpresa.email = updateEmpresaDto.email;
    return await this.empresaRepository.save(foundEmpresa);
  }
  /*
  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }*/
}
