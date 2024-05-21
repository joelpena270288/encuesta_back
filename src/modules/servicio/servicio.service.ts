import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';
import { Impuesto } from '../impuestos/entities/impuesto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicioService {
  constructor(
    @Inject('SERVICIO_REPOSITORY')
    private servicioRepository: Repository<Servicio>
  
  ) {}
 async create(createServicioDto: CreateServicioDto): Promise<Servicio> {
    const newServicio: Servicio = new Servicio();
   
    newServicio.name = createServicioDto.name.toUpperCase();
    newServicio.descripcion = createServicioDto.descripcion;
    

    const createdServicio: Servicio =
      await this.servicioRepository.save(newServicio);
    return createdServicio;
  }

 async findAll(): Promise<Servicio[]> {
    return await this.servicioRepository.find();
  }

 async findOne(id: string): Promise<Servicio> {
    const findServicio: Servicio = await this.servicioRepository.findOne({where:{id:id}
      
    });

    if (!findServicio) {
      throw new NotFoundException('No existe el servicio enviado');
    }

    return findServicio;
  }

  async update(
    id: string,
    updateServicioDto: UpdateServicioDto,
  ): Promise<Servicio> {
    const findServicio: Servicio = await this.servicioRepository.findOne({where:{ id:id}
     
    });

    if (!findServicio) {
      throw new NotFoundException('No existe el servicio enviado');
    }

    const newServicio: Servicio = new Servicio();
   

    findServicio.name = updateServicioDto.name.toUpperCase();
    findServicio.descripcion = updateServicioDto.descripcion;

    return await this.servicioRepository.save(findServicio);
  }

  async remove(id: string): Promise<Servicio> {
    const findServicio: Servicio = await this.servicioRepository.findOne({where:{id: id}});

    if (!findServicio) {
      throw new NotFoundException('No existe el servicio enviado');
    }
    return await this.servicioRepository.remove(findServicio);
  }
}
