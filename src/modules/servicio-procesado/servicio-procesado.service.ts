import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioProcesadoDto } from './dto/create-servicio-procesado.dto';
import { UpdateServicioProcesadoDto } from './dto/update-servicio-procesado.dto';
import { Repository } from 'typeorm';
import { ServicioProcesado } from './entities/servicio-procesado.entity';
import { PreFactura } from '../pre-factura/entities/pre-factura.entity';


@Injectable()
export class ServicioProcesadoService {

  constructor(
    @Inject('SERVICIOPROCESADO_REPOSITORY')
    private servicioProcesadoRepository: Repository<ServicioProcesado>,
    @Inject('PREFACTURA_REPOSITORY')
    private preFacturaRepository: Repository<PreFactura>,
  ) {}
  create(createServicioProcesadoDto: CreateServicioProcesadoDto) {
    return 'This action adds a new servicioProcesado';
  }

  findAll() {
    return `This action returns all servicioProcesado`;
  }

  findOne(id: string) {
    return `This action returns a #${id} servicioProcesado`;
  }

 async update(id: string, updateServicioProcesadoDto: UpdateServicioProcesadoDto): Promise<ServicioProcesado> {
   
  
  const servicioFound: ServicioProcesado = await this.servicioProcesadoRepository.findOne({where:{id: id}});
    if(!servicioFound){
      throw new NotFoundException("No esxite el servicio en la bd");
    }
     if(updateServicioProcesadoDto.cantidad == servicioFound.cantidad && updateServicioProcesadoDto.precio == servicioFound.precio && updateServicioProcesadoDto.valorimpuesto == servicioFound.valorimpuesto){
      throw new BadRequestException("No se realizaron cambios");
     }
    const foundPrefactura: PreFactura = await this.preFacturaRepository.findOne({where:{id: servicioFound.idprefactura}});
   
    if( parseFloat( updateServicioProcesadoDto.cantidad.toString())  > parseFloat(servicioFound.cantidad.toString())  ){
      const dif: number = parseFloat(updateServicioProcesadoDto.cantidad.toString())  - parseFloat(servicioFound.cantidad.toString())  ;
      if(dif > parseFloat(foundPrefactura.cantidad.toString()) ){
        throw new BadRequestException("La cantidad disponible es menor a la introducida");
      }

      foundPrefactura.cantidad = parseFloat(foundPrefactura.cantidad.toString()) - parseFloat(dif.toString()) ;
      foundPrefactura.updatedAt = new Date();
	  servicioFound.cantidad = parseFloat( servicioFound.cantidad.toString()) + parseFloat( dif.toString());
	  
      
     

    }
	else if(parseFloat( updateServicioProcesadoDto.cantidad.toString()) < parseFloat(servicioFound.cantidad.toString())  ) {
     const sum: number =  parseFloat( servicioFound.cantidad.toString()) - parseFloat(updateServicioProcesadoDto.cantidad.toString()) ;
    
     foundPrefactura.cantidad = parseFloat(foundPrefactura.cantidad.toString()) + parseFloat(sum.toString()) ;
     foundPrefactura.updatedAt = new Date();
	 servicioFound.cantidad = parseFloat(servicioFound.cantidad.toString()) -  parseFloat(sum.toString());
    
    }
    //Actualizando los servicios de las prefacturas

    foundPrefactura.importe = foundPrefactura.cantidad * foundPrefactura.precio;
    foundPrefactura.importeimpuesto = foundPrefactura.importe * foundPrefactura.valorimpuesto;
    foundPrefactura.valortotal = parseFloat(foundPrefactura.importe.toString()) + parseFloat(foundPrefactura.importeimpuesto.toString());
   
    await this.preFacturaRepository.save(foundPrefactura);
    servicioFound.precio = updateServicioProcesadoDto.precio;
    servicioFound.importe = servicioFound.cantidad * servicioFound.precio;
	servicioFound.valorimpuesto = updateServicioProcesadoDto.valorimpuesto;
    servicioFound.importeimpuesto = servicioFound.importe * servicioFound.valorimpuesto;
    servicioFound.valortotal = parseFloat(servicioFound.importe.toString()) + parseFloat(servicioFound.importeimpuesto.toString());

    return this.servicioProcesadoRepository.save(servicioFound);

    } 


 async remove(id: string): Promise<ServicioProcesado> {

  const servicioFound: ServicioProcesado = await this.servicioProcesadoRepository.findOne({where:{id: id}});
  if(!servicioFound){
    throw new NotFoundException("No esxite el servicio en la bd");
  }
  const foundPrefactura: PreFactura = await this.preFacturaRepository.findOne({where:{id: servicioFound.idprefactura}});
   
  foundPrefactura.cantidad = parseFloat(foundPrefactura.cantidad.toString()) + parseFloat(servicioFound.cantidad.toString());
  foundPrefactura.importe = foundPrefactura.cantidad * foundPrefactura.precio;
  foundPrefactura.importeimpuesto = foundPrefactura.importe * foundPrefactura.valorimpuesto;
  foundPrefactura.valortotal = parseFloat(foundPrefactura.importe.toString()) + parseFloat(foundPrefactura.importeimpuesto.toString());
  const savedPrefactura: PreFactura = await this.preFacturaRepository.save(foundPrefactura);
  if(!savedPrefactura){
    throw new BadRequestException("Error al editar servicio");
  }
 
 await this.servicioProcesadoRepository.delete({id: servicioFound.id, consecutivo: servicioFound.consecutivo});
 return servicioFound;
  }
  
}
