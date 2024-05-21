import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Cargo } from '../cargo/entities/cargo.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Repository } from 'typeorm';
import { Empresa } from '../empresa/entities/empresa.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @Inject('EMPLEADO_REPOSITORY')
    private empleadoRepository: Repository<Empleado>,
    @Inject('CARGO_REPOSITORY')
    private cargoRepository: Repository<Cargo>,
    @Inject('EMPRESA_REPOSITORY')
    private empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const foundEmpleado: Empleado = await this.empleadoRepository.findOne({
      where: {
        cedule: createEmpleadoDto.cedule,
        passport: createEmpleadoDto.passport
      }
    });
    if (foundEmpleado) {
      foundEmpleado.status = Status.ACTIVO;
      return await this.empleadoRepository.save(foundEmpleado);
     
    }

    const cargos: Cargo[] = [];
    for (let index = 0; index < createEmpleadoDto.cargos.length; index++) {
      const foundCargo: Cargo = await this.cargoRepository.findOne({
        where: { name: createEmpleadoDto.cargos[index] },
      });
      if (foundCargo) {
        cargos.push(foundCargo);
      }
    }
    const foundEmpresa: Empresa = await this.empresaRepository.findOne({
      where: { idetificador: 'SIGLER' }
    });
    const newEmpleado = new Empleado();
    newEmpleado.address = createEmpleadoDto.address;
    newEmpleado.cedule = createEmpleadoDto.cedule;
    newEmpleado.lastname = createEmpleadoDto.lastname;
    newEmpleado.status = Status.ACTIVO;
    newEmpleado.empresa = foundEmpresa;
    newEmpleado.cargos = cargos;
    newEmpleado.phone = createEmpleadoDto.phone;
    newEmpleado.passport = createEmpleadoDto.passport;
	newEmpleado.name = createEmpleadoDto.name;
  newEmpleado.fecha = createEmpleadoDto.fecha;
    return await this.empleadoRepository.save(newEmpleado);
  }

  async findAll(): Promise<Empleado[]> {
    return await this.empleadoRepository.find({
      where: { status: Status.ACTIVO },
    });
  }

  async findOne(id: string): Promise<Empleado> {
    const foundEmpleado: Empleado = await this.empleadoRepository.findOne({
      where: { id: id }
    });
    if (!foundEmpleado) {
      throw new NotFoundException('No existe el empleado');
    }
    return foundEmpleado;
  }

  async update(
    id: string,
    updateEmpleadoDto: UpdateEmpleadoDto
  ): Promise<Empleado> {
    const foundEmpleado: Empleado = await this.empleadoRepository.findOne({
      where: { id: id, status: Status.ACTIVO }
    });
    if (!foundEmpleado) {
      throw new NotFoundException('No existe el empleado');
    }
    if (updateEmpleadoDto.cargos.length < 1) {
      throw new BadRequestException(
        'El empleado tiene que tener al menos un cargo',
      );
    }

    const cargos: Cargo[] = [];
    for (let index = 0; index < updateEmpleadoDto.cargos.length; index++) {
      const foundCargo: Cargo = await this.cargoRepository.findOne({
        where: { name: updateEmpleadoDto.cargos[index] },
      });
      if (foundCargo) {
        cargos.push(foundCargo);
      }
    }
    foundEmpleado.address = updateEmpleadoDto.address;
    foundEmpleado.cargos = cargos;
    foundEmpleado.cedule = updateEmpleadoDto.cedule;
    foundEmpleado.lastname = updateEmpleadoDto.lastname;
    foundEmpleado.name = updateEmpleadoDto.name;
    foundEmpleado.passport = updateEmpleadoDto.passport;
    foundEmpleado.phone = updateEmpleadoDto.phone;
    foundEmpleado.updatedAt = new Date();
    foundEmpleado.fecha = updateEmpleadoDto.fecha;
    return await this.empleadoRepository.save(foundEmpleado);
  }

 async remove(id: string):Promise<Empleado> {
    const foundEmpleado: Empleado = await this.empleadoRepository.findOne({
      where: { id: id, status: Status.ACTIVO },
    });
    if (!foundEmpleado) {
      throw new NotFoundException('No existe el empleado');
    }
    foundEmpleado.status = Status.INACTIVO;
    foundEmpleado.updatedAt = new Date();
    return await this.empleadoRepository.save(foundEmpleado);
  }

}
