import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateB11Dto } from './dto/create-b11.dto';
import { UpdateB11Dto } from './dto/update-b11.dto';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Repository } from 'typeorm';
import { B11 } from './entities/b11.entity';
@Injectable()
export class B11Service {
  constructor(
    @Inject('B11_REPOSITORY')
    private b11Repository: Repository<B11>,
  ) {}
  async create(createB11Dto: CreateB11Dto): Promise<boolean> {
    for (let index = createB11Dto.init; index <= createB11Dto.end; index++) {
     
      const foundb11: B11 = await this.b11Repository.createQueryBuilder('b11')
 .where('b11.status = :estado',{estado: Status.ACTIVO}) 
 .andWhere('b11.fecha >= :fecha',{fecha: new Date()})
 .andWhere('b11.valor = :valor',{valor: 'B1'+index})
 .getOne();
     

     if(!foundb11){
      const b11: B11 = new B11();
   
    
      b11.fecha = createB11Dto.fecha;
     
      b11.valor = "B1"+ index;
      try{
        await this.b11Repository.save(b11);
      }catch(e){
        console.log('Error al insertar '+ e);
      }
    }
  }
    
return true;
  }

 async findAll():Promise<B11[]> {
    const foundb11: B11[] = await this.b11Repository.createQueryBuilder('b11')
    .addOrderBy('b11.valor')
    .where('b11.status = :estado',{estado: Status.ACTIVO}) 
    .andWhere('b11.fecha >= :fecha',{fecha: new Date()})  
    .getMany();
    return foundb11;
  }

  async findOne(): Promise<B11> {
    const foundb11: B11 = await this.b11Repository.createQueryBuilder('b11')
    .addOrderBy('b11.valor')
    .where('b11.status = :estado',{estado: Status.ACTIVO}) 
    .andWhere('b11.fecha >= :fecha',{fecha: new Date()})  
    .getOne();
    if(!foundb11){
        throw new NotFoundException('No quedan consecutivos B11 disponibles ');
    }
    return foundb11;
    }

  update(id: number, updateB11Dto: UpdateB11Dto) {
    return `This action updates a #${id} b11`;
  }

  remove(id: number) {
    return `This action removes a #${id} b11`;
  }
}
