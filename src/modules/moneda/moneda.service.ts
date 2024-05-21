import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonedaDto } from './dto/create-moneda.dto';
import { UpdateMonedaDto } from './dto/update-moneda.dto';
import { Moneda } from './entities/moneda.entity';
import { Repository } from 'typeorm';
import {Status} from '../../EntityStatus/entity.estatus.enum'
@Injectable()
export class MonedaService {
  constructor(
    @Inject('MONEDA_REPOSITORY')
    private monedaRepository: Repository<Moneda>,
  ){}
 async create(createMonedaDto: CreateMonedaDto): Promise<Moneda> {
   const foundMoneda: Moneda = await this.monedaRepository.findOne({where:{valor: createMonedaDto.valor.toUpperCase()}});
   if(foundMoneda){
    foundMoneda.updatedAt = new Date();
    foundMoneda.status = Status.ACTIVO;
    return await this.monedaRepository.save(foundMoneda);

   }
  
   const moneda: Moneda = new Moneda();
  moneda.tasa = createMonedaDto.tasa;
  moneda.valor = createMonedaDto.valor.toUpperCase();

  return await this.monedaRepository.save(moneda);

  }

 async findAll(): Promise<Moneda[]> {
    return  await this.monedaRepository.find({where:{status: Status.ACTIVO}});
  }

 async findOne(id: string): Promise<Moneda> {
    return await this.monedaRepository.findOne({where:{id: id,status: Status.ACTIVO}});
  }

 async update(id: string, updateMonedaDto: UpdateMonedaDto):Promise<Moneda> {
   const foundMoneda: Moneda = await this.monedaRepository.findOne({where: {id: id,status: Status.ACTIVO}});
   if(!foundMoneda){
   throw new  NotFoundException('No existe la moneda introducida');  
   }
  foundMoneda.tasa = updateMonedaDto.tasa;
  foundMoneda.valor = updateMonedaDto.valor.toUpperCase();
  foundMoneda.updatedAt = new Date();
  return  await this.monedaRepository.save(foundMoneda);
  }

 async remove(id: string): Promise<Moneda> {
    const foundMoneda: Moneda = await this.monedaRepository.findOne({where: {id: id,status: Status.ACTIVO}});
    if(!foundMoneda){
    throw new  NotFoundException('No existe la moneda introducida');  
    }
    foundMoneda.status = Status.INACTIVO;
    return await this.monedaRepository.save(foundMoneda);
  }
}
