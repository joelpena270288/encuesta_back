import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateB02Dto } from './dto/create-b02.dto';
import { UpdateB02Dto } from './dto/update-b02.dto';
import { B02 } from './entities/b02.entity';
import { Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class B02Service {
  constructor(
    @Inject('B02_REPOSITORY')
    private b02Repository: Repository<B02>
  ) {}
  
    async create(createB02Dto: CreateB02Dto): Promise<boolean>  {
      for (let index = createB02Dto.init; index <= createB02Dto.end; index++) {
        const foundb02: B02 = await this.b02Repository.createQueryBuilder('b02')
        .where('b02.status = :estado',{estado: Status.ACTIVO}) 
        .andWhere('b02.fecha >= :fecha',{fecha: new Date()})
        .andWhere('b02.valor = :valor',{valor: 'B0'+index})
        .getOne();
            
       
            if(!foundb02){
        const b02: B02 = new B02();
   
     
        b02.fecha =  createB02Dto.fecha;
       
        b02.valor = "B0"+ index;
        try{
          await this.b02Repository.save(b02);
        }catch(e){
          console.log('Error al insertar ');
        }
        }
      }
      
  return true;
  
  }

 

 async findOne(): Promise<B02> {

  const foundb02: B02 = await this.b02Repository.createQueryBuilder('b02')
  .addOrderBy('b02.valor')
  .where('b02.status = :estado',{estado: Status.ACTIVO}) 
  .andWhere('b02.fecha >= :fecha',{fecha: new Date()})  
  .getOne();


  if(! foundb02){
    throw new NotFoundException("No quedan consecutivos B02 disponibles");
   }
   return foundb02;
  }
  async findAll():Promise<B02[]> {	 
    const foundb02: B02[] = await this.b02Repository.createQueryBuilder('b02')
    .addOrderBy('b02.valor')
    .where('b02.status = :estado',{estado: Status.ACTIVO}) 
    .andWhere('b02.fecha >= :fecha',{fecha: new Date()})  
    .getMany();
	 
    return foundb02 ;
  }

 

}

