import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateB01Dto } from './dto/create-b01.dto';
import { UpdateB01Dto } from './dto/update-b01.dto';
import { B01 } from './entities/b01.entity';
import { Index, Repository } from 'typeorm';
import { boolean } from 'joi';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class B01Service {
  constructor(
    @Inject('B01_REPOSITORY')
    private b01Repository: Repository<B01>,
  ) {}
 async create(createB01Dto: CreateB01Dto): Promise<boolean>  {
 

    for (let index = createB01Dto.init; index <= createB01Dto.end; index++) {
     
      const foundb01: B01 = await this.b01Repository.createQueryBuilder('b01')
 .where('b01.status = :estado',{estado: Status.ACTIVO}) 
 .andWhere('b01.fecha >= :fecha',{fecha: new Date()})
 .andWhere('b01.valor = :valor',{valor: 'B0'+index})
 .getOne();
     

     if(!foundb01){
      const b01: B01 = new B01();
     
      
      b01.fecha =createB01Dto.fecha;
      
     
      b01.valor = "B0"+ index;
      try{
        await this.b01Repository.save(b01);
      }catch(e){
        console.log('Error al insertar '+ e);
      }
    }
  }
    
return true;

  }

 async findAll():Promise<B01[]> {	 
	 
  const foundb01: B01[] = await this.b01Repository.createQueryBuilder('b01')
  .addOrderBy('b01.valor')
  .where('b01.status = :estado',{estado: Status.ACTIVO}) 
  .andWhere('b01.fecha >= :fecha',{fecha: new Date()})  
  .getMany();
  return foundb01;
  }

 async findOne(): Promise<B01> {
  const foundb01: B01 = await this.b01Repository.createQueryBuilder('b01')
  .addOrderBy('b01.valor')
  .where('b01.status = :estado',{estado: Status.ACTIVO}) 
  .andWhere('b01.fecha >= :fecha',{fecha: new Date()})  
  .getOne();
  if(!foundb01){
      throw new NotFoundException('No quedan consecutivos B01 disponibles ');
  }
  return foundb01;
  }

  update(id: number, updateB01Dto: UpdateB01Dto) {
    return `This action updates a #${id} b01`;
  }

  remove(id: number) {
    return `This action removes a #${id} b01`;
  }
}
