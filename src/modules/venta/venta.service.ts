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
import { Encuesta } from '../encuesta/entities/encuesta.entity';
import { VentaEncuesta } from './dto/venta-encuesta.dto';
import * as moment from 'moment';
@Injectable()
export class VentaService {
  constructor(
    @Inject('VENTA_REPOSITORY')
    private ventaRepository: Repository<Venta>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>,
    @Inject('VENDEDOR_REPOSITORY')
    private vendedorRepository: Repository<Vendedor>,
	 @Inject('ENCUESTA_REPOSITORY')
    private encuestaRepository: Repository<Encuesta>
  
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
 vehiculo.marca = createVentaDto.marca;
 vehiculo.modelo = createVentaDto.modelo;
  

 venta.correoCliente = createVentaDto.correoCliente;
  venta.documentoCliente = createVentaDto.documentoCliente;
  venta.fecha = createVentaDto.fecha;
  venta.iduser = createVentaDto.iduser;
  venta.nombreCliente = createVentaDto.nombreCliente;
  venta.telefonoCliente = createVentaDto.telefonoCliente;
  venta.precioVenta = createVentaDto.precioVenta;
  venta.precioFinVenta = createVentaDto.precioFinVenta;
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
    return await this.ventaRepository.find({ order: {
        fecha: 'DESC',
      },where: {status: Status.ACTIVO}});
  }
  
  
  
  async  findAllByUser(user: User): Promise<VentaEncuesta[]> {    
  
  const totalEcuestas: Encuesta[] = await this.encuestaRepository.find({where: {status: Status.ACTIVO }});
  const VentasList : VentaEncuesta[] = []; 
	const ventas: Venta[] =  await this.ventaRepository
	  .createQueryBuilder('venta')
	   .orderBy('venta.fecha', 'ASC')
	  .innerJoinAndSelect('venta.vehiculo','vehiculo')
	  .leftJoinAndSelect('venta.cuestionarios','cuestionarios')
	   .where('venta.iduser = :iduser', {
        iduser: user.id
      })
	  .andWhere('venta.status = :estado',{ estado: Status.ACTIVO })
	
	   .getMany();
	   
	  for(let i = 0; i < ventas.length; i ++){
		 const completadas: Encuesta[] = [];
		  if(totalEcuestas.length!= ventas[i].cuestionarios.length){
		  
		  for(let j = 0; j< ventas[i].cuestionarios.length; j++){
			var found =  totalEcuestas.find(x=> x.id == ventas[i].cuestionarios[j].encuesta.id );
			if(found){
			completadas.push(found);	
				
				
			}
			  
		 
		   }
		  
		  
		const result: VentaEncuesta = new VentaEncuesta();
		 result.id =  ventas[i].id;
		 result.nombreCliente = ventas[i].nombreCliente;  
         result.telefonoCliente = ventas[i].telefonoCliente;   
         result.correoCliente =  ventas[i].correoCliente;  
         result.documentoCliente = ventas[i].documentoCliente; 
         result.fecha = ventas[i].fecha;
         result.chasis = ventas[i].vehiculo.chasis;
		 result.marca = ventas[i].vehiculo.marca;
         result.modelo = ventas[i].vehiculo.modelo;
		 result.color = ventas[i].vehiculo.color;
         result.encuestasCompletadas = [...completadas];
VentasList.push(result);	
		  
		  }
		  
	  }
	  
	
	return VentasList;
	
	
  
  
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
	found.precioVenta = updateVentaDto.precioVenta;
    found.precioFinVenta = updateVentaDto.precioFinVenta;
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
  async ventasActuales():Promise<Venta[]>{
	  const anno: string = new Date().getFullYear().toString();
    const init: string = anno+"-01-01";
    const end: string = anno+ "-12-31"; 
    
    return  await this.ventaRepository
      .createQueryBuilder('venta')
     
      .where('venta.fecha >= :start', {
        start: init + ' 00:00:00',
      })
      .andWhere('venta.fecha  <= :end', {
        end: end + ' 23:59:00',
      })
      .andWhere('venta.status  = :estado', {
        estado: Status.ACTIVO,
      })
      .getMany();

    
	  
  }
}
