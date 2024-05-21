import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { ResumenProyectosDto } from './dto/resume-status-proyecto.dto';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Not, Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { StatusProyecto } from './status.enum';
import { isNotIn } from 'class-validator';
import { Factura } from '../factura/entities/factura.entity';
import { StatusFactura } from '../factura/entities/fatura-status.enum';

@Injectable()
export class ProyectoService {
  constructor(
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
    @Inject('EMPRESA_REPOSITORY')
    private empresaRepository: Repository<Empresa>,
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
  ) {}
  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    const foundCliente: Cliente = await this.clienteRepository.findOne({
      where: { id: createProyectoDto.idCliente, status: 'ACTIVO' },
    });
    if (!foundCliente) {
      throw new NotFoundException('El Cliente no existe');
    }
    const foundEmpresa: Empresa = await this.empresaRepository.findOne({
      where: { idetificador: 'SIGLER' },
    });
    const newProyecto = new Proyecto();
    const proanterior: Proyecto = await this.proyectoRepository.createQueryBuilder('proyecto')
    .addOrderBy('proyecto.consecutivo','DESC')
     
    .getOne();
    if(!proanterior){
      newProyecto.consecutivo = 1;
    
    }else{
      newProyecto.consecutivo = proanterior.consecutivo +1;
    }
    newProyecto.cliente = foundCliente;
    newProyecto.empresa = foundEmpresa;
    newProyecto.fecha_fin = null;
    newProyecto.fecha_inicio = null;
    newProyecto.name = createProyectoDto.name;  
    newProyecto.ajuste = createProyectoDto.ajuste; 
    return  await this.proyectoRepository.save(newProyecto);   
    
  }

  async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({
      where: { status: Not(StatusProyecto.CANCELADO) },
    });
  }

  async findOne(id: string): Promise<Proyecto> {
    return await this.proyectoRepository.findOne({  relations: {
        cliente: true,
		conducesprocesados: true,
		prefacturas: true,
    cotizacion: true

    },where: { 
      
      
      id: id },
      order: {
        cotizacion: {
          createdAt: "ASC"
        }
        }});
  }

 async update(id: string, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto> {
   
  const foundCliente: Cliente = await this.clienteRepository.findOne({
     where: { id: updateProyectoDto.idCliente, status: 'ACTIVO' },
  });
  if (!foundCliente) {
    throw new NotFoundException('El Cliente no existe');
  }
  const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where:{id: id}})
  if (!foundProyecto) {
    throw new NotFoundException('El Proyecto no existe');
  }
  foundProyecto.cliente = foundCliente;
  foundProyecto.name = updateProyectoDto.name;
  foundProyecto.ajuste = updateProyectoDto.ajuste;

   return await this.proyectoRepository.save(foundProyecto);
  }

 async remove(id: string):Promise<Proyecto> {
   const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where: {id: id,status: StatusProyecto.CREADO}});
   if(!foundProyecto){
    throw new NotFoundException('No existe el proyecto');

   }
   foundProyecto.status = StatusProyecto.CANCELADO;
   foundProyecto.updatedAt = new Date();
  
   return await this.proyectoRepository.save(foundProyecto);
  }
  async aprobar(id: string): Promise<Proyecto>{
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where: {id: id,status: StatusProyecto.CREADO}});
    if(!foundProyecto){
     throw new NotFoundException('No existe el proyecto o el proyecto no esta en estado CREADO');
 
    }
	foundProyecto.status = StatusProyecto.APROBADO;
	foundProyecto.fecha_inicio = new Date();
    return await this.proyectoRepository.save(foundProyecto);

  }
   async cerrar(id: string): Promise<Proyecto>{
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where: {id: id,status: StatusProyecto.APROBADO}});
    if(!foundProyecto){
     throw new NotFoundException('No existe el proyecto o el proyecto no esta en estado APROBADO');
 
    }
	foundProyecto.status = StatusProyecto.COMPLETADO;
	foundProyecto.fecha_fin = new Date();
    return await this.proyectoRepository.save(foundProyecto);

  }
  async getProyectosAprobados(): Promise<Proyecto[]>{
     return await this.proyectoRepository.find({
      where: { status: StatusProyecto.APROBADO },
    });
  }
  async getByFilterDate(filtroFechaDto: FiltroFechaDto): Promise<ResumenProyectosDto>{
    if(filtroFechaDto.start == null || filtroFechaDto.end == null){
      throw new BadRequestException('Debe introducir una fecha inicio y una fecha fin');
    }
	  const resumenProyectosDto: ResumenProyectosDto = new ResumenProyectosDto();
	  resumenProyectosDto.creados = 0;
	   resumenProyectosDto.cancelados = 0;
	   resumenProyectosDto.completados = 0;
	   resumenProyectosDto.aprobados = 0;
	  const foundProyectos: Proyecto[] = await this.proyectoRepository.createQueryBuilder('proyecto')
 .where('proyecto.updatedAt >= :start',{start: filtroFechaDto.start+' 00:00:00'}) 
 .andWhere('proyecto.updatedAt  <= :end',{end: filtroFechaDto.end+' 23:59:00'})
 .getMany();
 
 if(foundProyectos){ 
  for(let index = 0; index < foundProyectos.length; index++){
	  switch(foundProyectos[index].status){
		 case 'APROBADO':{
	    resumenProyectosDto.aprobados += 1;
	   
	   
	   break;
	   } 
      case 'CREADO': {
		resumenProyectosDto.creados +=1; 
		 break;
	  }	
      case 'CANCELADO': {
		  resumenProyectosDto.cancelados += 1;
		  break;
	  }	  
	  case 'COMPLETADO': {
		  resumenProyectosDto.completados += 1; 
	  }
		  
		  
	  }
  }
     
 }
 return resumenProyectosDto;
	  
  }
  async createNotaCotizacion(id: string, nota: string):Promise<Proyecto>{
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
      where: { id: id },
   });
   if (!foundProyecto) {
     throw new NotFoundException('El Proyecto no existe');
   }
   foundProyecto.notacotizacion = nota;
   return await this.proyectoRepository.save(foundProyecto);
  }
}
