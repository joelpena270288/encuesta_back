import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProvedorDto } from './dto/create-provedor.dto';
import { UpdateProvedorDto } from './dto/update-provedor.dto';
import { Provedor } from './entities/provedor.entity';
import { Repository } from 'typeorm';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { TipoDocumento } from './dto/tipo-documento.enum';
import {StatusGasto} from '../gastos_empresas/entities/gasto-status.enum';
@Injectable()
export class ProvedorService {
  constructor(
    @Inject('PROVEDOR_REPOSITORY')
    private provedorRepository: Repository<Provedor>,
  ) {}

 async create(createProvedorDto: CreateProvedorDto): Promise<Provedor> {
    const findProvedor = await this.provedorRepository.findOne({
      where: { documento: createProvedorDto.documento.toUpperCase() },
    });

    if (findProvedor) {
      findProvedor.status = Status.ACTIVO;
     return await this.provedorRepository.save(findProvedor);
    }
    const provedor: Provedor = new Provedor();
  
   if(createProvedorDto.tipodocumento == 'cedula'){
    if(createProvedorDto.documento.length != 13){
      throw new BadRequestException("El formato de la cedula esta mal");
    }
    provedor.tipodocumento = TipoDocumento.CEDULA;
   }else if(createProvedorDto.tipodocumento == 'rnc'){
    if(createProvedorDto.documento.length != 11){
      throw new BadRequestException("El formato del RNC esta mal");
    }
    provedor.tipodocumento = TipoDocumento.RNC;
   }else{
    provedor.tipodocumento = TipoDocumento.PASAPORTE;

   }
    
   provedor.nombre = createProvedorDto.nombre.toUpperCase();
   provedor.direccion = createProvedorDto.direccion;
  
   provedor.documento = createProvedorDto.documento;
   provedor.informal = createProvedorDto.informal;
   provedor.phone = createProvedorDto.telefono;

    return await this.provedorRepository.save(provedor);

  }

 async findAll(): Promise<Provedor[]> {
    return await this.provedorRepository.find({ where: { status: Status.ACTIVO } });
  }

 async findOne(id: string): Promise<Provedor> {
    return await this.provedorRepository.findOne({ where: { id: id } });
  }

 async update(id: string, updateProvedorDto: UpdateProvedorDto):Promise<Provedor> {
    const findProvedor = await this.provedorRepository.findOne({
      where: { id: id, status: Status.ACTIVO },
    });
    if(!findProvedor){
      throw new NotFoundException("El proveedor no existe");
  
    }
    if(updateProvedorDto.tipodocumento == 'cedula'){
      if(updateProvedorDto.documento.length !=13){
        throw new BadRequestException("El formato de la cedula esta mal");
      }
      findProvedor.tipodocumento = TipoDocumento.CEDULA;
      }else if(updateProvedorDto.tipodocumento == 'rnc'){
        if(updateProvedorDto.documento.length !=11){
          throw new BadRequestException("El formato del RNC esta mal");
        }
        findProvedor.tipodocumento = TipoDocumento.RNC;
      }else{
        findProvedor.tipodocumento = TipoDocumento.PASAPORTE;
      }
      findProvedor.nombre = updateProvedorDto.nombre.toUpperCase();
      findProvedor.direccion = updateProvedorDto.direccion;  
      findProvedor.documento = updateProvedorDto.documento.toUpperCase();
      findProvedor.informal = updateProvedorDto.informal;
      findProvedor.phone = updateProvedorDto.telefono;
      return await this.provedorRepository.save(findProvedor);
  }

 async remove(id: string):Promise<Provedor> {
    const findProvedor = await this.provedorRepository.findOne({
      where: { id: id},
    });
    if(!findProvedor){
      throw new NotFoundException("El proveedor no existe");
  
    }
    findProvedor.status = Status.INACTIVO;
    return await this.provedorRepository.save(findProvedor);
  }
  async provedorCuentaPorPagar():Promise<Provedor[]>{
   return  await this.provedorRepository
    .createQueryBuilder('provedor')
    .innerJoin(
      'provedor.gastos',

      'gastos',
      'gastos.status = :estadoGasto',
      { estadoGasto: StatusGasto.ACTIVO },
    )
   
   
    .getMany();
  }
    async provedorCuentaPorPagarInformal():Promise<Provedor[]>{
      return  await this.provedorRepository
       .createQueryBuilder('provedor')
       .innerJoin(
         'provedor.gastos',
   
         'gastos',
         'gastos.status = :estadoGasto',
         { estadoGasto: StatusGasto.ACTIVO },
       )
       .where('prvedor.informal = true')
      
      
       .getMany();
     }
  }

