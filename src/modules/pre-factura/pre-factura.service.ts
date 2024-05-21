import { Inject, Injectable } from '@nestjs/common';
import { CreatePreFacturaDto } from './dto/create-pre-factura.dto';
import { UpdatePreFacturaDto } from './dto/update-pre-factura.dto';
import { Not, Repository } from 'typeorm';
import { PreFactura } from './entities/pre-factura.entity';

@Injectable()
export class PreFacturaService {
  constructor(
    @Inject('PREFACTURA_REPOSITORY')
    private preFacturaRepository: Repository<PreFactura>,
  ) {}
  create(createPreFacturaDto: CreatePreFacturaDto) {
    return 'This action adds a new preFactura';
  }

  findAll() {
    return `This action returns all preFactura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preFactura`;
  }

  update(id: number, updatePreFacturaDto: UpdatePreFacturaDto) {
    return `This action updates a #${id} preFactura`;
  }

  remove(id: number) {
    return `This action removes a #${id} preFactura`;
  }
 async findByIdProyecto(idProyecto: string): Promise<PreFactura[]>{
  const prefactura: PreFactura[] = await this.preFacturaRepository.find({
    relations: {
      proyecto: false,
  },
  where: {
      proyecto: {
          id: idProyecto,
        
        
      },
      cantidad: Not(0)
    
 
  },
  });

return prefactura;
 }

 async findByIdProyectoActiva(idProyecto: string): Promise<PreFactura[]>{
  const prefactura: PreFactura[] = await this.preFacturaRepository.find({
    relations: {
      proyecto: false,
  },
  where: {
      proyecto: {
          id: idProyecto,
        
        
      }
    
 
  },

  });

return prefactura;
 }
}
