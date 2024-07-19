import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { User } from '../users/entities/user.entity';
import { Log } from '../log/entities/log.entity';

@Injectable()
export class ColorService {
  constructor(
    @Inject('COLOR_REPOSITORY')
    private colorRepository: Repository<Color>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>
  ) {}
 async  create(createColorDto: CreateColorDto,user: User):Promise<Color> {
    const found: Color = await this.colorRepository.findOne({where:{
      name: createColorDto.name.toUpperCase()
  
      }})
      if(found){
        found.status = Status.ACTIVO;
        await this.colorRepository.save(found);
        const log: Log = new Log();
        log.usuario = user.username;
        log.accion = 'Activar';
        log.entidad = 'Color';
        log.mensaje = found.name;
        await this.logRepository.save(log);
        return found;
  
      }else{
        const newColor: Color = new Color();
        newColor.name = createColorDto.name.toUpperCase();
        await this.colorRepository.save(newColor);
        const log: Log = new Log();
        log.usuario = user.username;
        log.accion = 'Nuevo';
        log.entidad = 'Color';
        log.mensaje = newColor.name;
        await this.logRepository.save(log);
        return newColor;
      }  
      
  }

async  findAll():Promise<Color[]> {
    return await this.colorRepository.find({where: {status: Status.ACTIVO}});
  }

 async findOne(id: string): Promise<Color> {
    return await this.colorRepository.findOne({where: {id: id}});
  }

async update(id: string, updateColorDto: UpdateColorDto,user: User):Promise<Color> {
const found: Color = await this.colorRepository.findOne({where:{id: id}});
if(!found){
  throw new NotFoundException('No existe el color introducido');
}
 
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Modificar';
    log.entidad = 'Color';
    log.mensaje = found.name;
    await this.logRepository.save(log);

    found.name = updateColorDto.name.toUpperCase();
    return await this.colorRepository.save(found);
  }

 async remove(id: string,user: User): Promise<Color> {
const found: Color = await this.colorRepository.findOne({where:{id: id}});
if(!found){
  throw new NotFoundException('No existe el color introducido');
}
found.status = Status.INACTIVO;
 
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Eliminar';
    log.entidad = 'Color';
    log.mensaje = found.name;
    await this.logRepository.save(log);

    return await this.colorRepository.save(found);
  }
}
