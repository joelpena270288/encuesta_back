import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { Vehiculo } from './entities/vehiculo.entity';
import { User } from '../users/entities/user.entity';
import { Log } from '../log/entities/log.entity';
import { Vendedor } from '../vendedor/entities/vendedor.entity';
@Injectable()
export class VentaService {
  constructor(
    @Inject('VENTA_REPOSITORY')
    private ventaRepository: Repository<Venta>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('VENDEDOR_REPOSITORY')
    private vendedorRepository: Repository<Vendedor>
  
  ) {}
 async create(createVentaDto: CreateVentaDto,user: User):Promise<Venta> {
   const found: Venta = await this.ventaRepository.findOne({where: {
    vehiculo: {
      chasis: createVentaDto.chasis
    },
    status: Status.ACTIVO
   }});
   if(found){
    throw new ConflictException("Ya existe una venta registrada a ese chasis");
   }
   const vendedor: Vendedor = await this.vendedorRepository.findOne({where: {id: createVentaDto.idVendedor, status: Status.ACTIVO}});
if(!vendedor){
  throw new NotFoundException("El vendedor introducido no existe o esta deshabilidado");
}
  const venta: Venta = new Venta();
  const vehiculo: Vehiculo = new Vehiculo();
  vehiculo.chasis = createVentaDto.chasis;
  vehiculo.color = createVentaDto.color;
  vehiculo.modelo = createVentaDto.modelo;
  venta.correoCliente = createVentaDto.correoCliente;
  venta.documentoCliente = createVentaDto.documentoCliente;
  venta.fecha = createVentaDto.fecha;
  venta.iduser = createVentaDto.iduser;
  venta.nombreCliente = createVentaDto.nombreCliente;
  venta.telefonoCliente = createVentaDto.telefonoCliente;
  venta.vehiculo = vehiculo;
  venta.vendedor = vendedor;
  await this.ventaRepository.save(venta);
  const log: Log = new Log();
      log.usuario = user.username;
      log.accion = 'Crear';
      log.entidad = 'Venta';
      log.mensaje = "Venta del vehiculo: " + vehiculo.chasis;
      await this.logRepository.save(log);
   return venta;
  }

async  findAll(): Promise<Venta[]> {
    return await this.ventaRepository.find({where: {status: Status.ACTIVO}});
  }
  async  findAllByUser(user: User): Promise<Venta[]> {
    return await this.ventaRepository.find({where: {status: Status.ACTIVO, iduser: user.id}});
  }

 async findOne(id: string): Promise<Venta> {

   const found: Venta = await this.ventaRepository.findOne({where: {id: id}});
   if(!found){
    throw new NotFoundException("No Existe la venta introducida");
   }
   return found;
  }

 async update(id: string, updateVentaDto: UpdateVentaDto, user: User): Promise<Venta> {
    const found: Venta = await this.ventaRepository.findOne({where: {id: id}});
    if(!found){
     throw new NotFoundException("No Existe la venta introducida");
    }
    const vendedor: Vendedor = await this.vendedorRepository.findOne({where: {id: updateVentaDto.idVendedor, status: Status.ACTIVO}});
    if(!vendedor){
      throw new NotFoundException("El vendedor introducido no existe o esta deshabilidado");
    }
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Crear';
    log.entidad = 'Venta';
    log.mensaje = "Modifico la venta del vehiculo: " + found.vehiculo.chasis;
    await this.logRepository.save(log);

    found.correoCliente = updateVentaDto.correoCliente;
    found.documentoCliente = updateVentaDto.documentoCliente;
    found.fecha = updateVentaDto.fecha;
    found.iduser = updateVentaDto.iduser;
    found.nombreCliente = updateVentaDto.nombreCliente;
    found.telefonoCliente = updateVentaDto.telefonoCliente;
    found.vehiculo.chasis = updateVentaDto.chasis;
    found.vehiculo.modelo = updateVentaDto.modelo;
    found.vehiculo.color = updateVentaDto.color;
    found.vendedor = vendedor;
    found.updatedAt = new Date();
    return await this.ventaRepository.save(found);

  }

async  remove(id: string,user: User): Promise<Venta> {
    const found: Venta = await this.ventaRepository.findOne({where: {id: id}});
    if(!found){
     throw new NotFoundException("No Existe la venta introducida");
    }
   

    found.status = Status.INACTIVO;
    await this.ventaRepository.save(found);
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Crear';
    log.entidad = 'Venta';
    log.mensaje = "Deshabilito la venta del vehiculo: " + found.vehiculo.chasis;
    await this.logRepository.save(log);
    return found;
  }
}
