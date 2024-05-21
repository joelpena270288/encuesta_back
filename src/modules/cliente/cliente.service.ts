import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

import { Status } from '../../EntityStatus/entity.estatus.enum';
import { TipoDocumento } from './tipo-documento.enum';
import { Credito } from './entities/credito.entity';
import {StatusFactura} from '../factura/entities/fatura-status.enum'

@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const findCliente = await this.clienteRepository.findOne({
      where: { nombre: createClienteDto.nombre.toUpperCase() },
    });

    if (findCliente) {
      findCliente.status = Status.ACTIVO;
     return await this.clienteRepository.save(findCliente);
    }
    const cliente: Cliente = new Cliente();
    const credito: Credito = new Credito();
   if(createClienteDto.tipoDocumento == 'cedula'){
    if(createClienteDto.rcn.length != 13){
      throw new BadRequestException("El formato de la cedula esta mal");
    }
   cliente.tipoDocumento = TipoDocumento.CEDULA;
   }else{
    if(createClienteDto.rcn.length != 11){
      throw new BadRequestException("El formato del RNC esta mal");
    }
    cliente.tipoDocumento = TipoDocumento.RNC;
   }
   const clianterior: Cliente = await this.clienteRepository.createQueryBuilder('cliente')
   .addOrderBy('cliente.consecutivo','DESC')
    
   .getOne();
   if(!clianterior){
    cliente.consecutivo = 1;
   
   }else{
    cliente.consecutivo = clianterior.consecutivo +1;
   }
    cliente.nombre = createClienteDto.nombre.toUpperCase();
    cliente.direccion = createClienteDto.direccion;
    cliente.telefono = createClienteDto.telefono;
    cliente.rcn = createClienteDto.rcn;
    cliente.nombrecontacto = createClienteDto.nombrecontacto;
    cliente.email = createClienteDto.email;
    cliente.credito = credito;

    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({ where: { status: Status.ACTIVO } });
  }

 async findOne(id: string) {
    return await this.clienteRepository.find({ where: { id: id } });
  }

 async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
  const findCliente = await this.clienteRepository.findOne({
    where: { id: id, status: Status.ACTIVO },
  });
  if(!findCliente){
    throw new NotFoundException("El cliente no existe");

  }
  if(updateClienteDto.tipoDocumento == 'cedula'){
    if(updateClienteDto.rcn.length !=13){
      throw new BadRequestException("El formato de la cedula esta mal");
    }
    findCliente.tipoDocumento = TipoDocumento.CEDULA;
    }else{
      if(updateClienteDto.rcn.length !=11){
        throw new BadRequestException("El formato del RNC esta mal");
      }
      findCliente.tipoDocumento = TipoDocumento.RNC;
    }
  findCliente.nombre = updateClienteDto.nombre.toUpperCase();
  findCliente.direccion = updateClienteDto.direccion;
  findCliente.telefono = updateClienteDto.telefono;
  findCliente.rcn = updateClienteDto.rcn;
  findCliente.nombrecontacto = updateClienteDto.nombrecontacto;
  findCliente.email = updateClienteDto.email;
    return await this.clienteRepository.save(findCliente);
  }

 async remove(id: string) {
    const findCliente = await this.clienteRepository.findOne({
      where: { id: id, status: Status.ACTIVO },
    });
    if(!findCliente){
      throw new NotFoundException("El cliente no existe");
  
    }
    findCliente.status = Status.INACTIVO;
    return await this.clienteRepository.save(findCliente);
  }
  async getClienteWithCuentasPorCobrar(): Promise<Cliente[]>{
    return  await this.clienteRepository
    .createQueryBuilder('cliente')
    .innerJoin(
      'cliente.facturas',

      'factura',
      'factura.status = :statusFactura',
      { statusFactura: StatusFactura.APROBADA },
    )
    .innerJoin(
      'factura.cuentaporcobrar',

      'cuentaporcobrar',
      'cuentaporcobrar.status = :statuscuenta',
      { statuscuenta: Status.ACTIVO },
    )
   
   
    .getMany();
    
  }
}
