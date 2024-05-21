import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConduceProcezadoDto } from './dto/create-conduce-procezado.dto';
import { UpdateConduceProcezadoDto } from './dto/update-conduce-procezado.dto';
import { Repository } from 'typeorm';
import { ConduceProcezado } from './entities/conduce-procezado.entity';
import { Conduce } from '../conduce/entities/conduce.entity';
import { EstatusConduce } from '../conduce/status.enum';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { PreFactura } from '../pre-factura/entities/pre-factura.entity';

@Injectable()
export class ConduceProcezadoService {
  constructor(
    @Inject('CONDUCEPROCEZADO_REPOSITORY')
    private conduceprocezadoRepository: Repository<ConduceProcezado>,
    @Inject('CONDUCE_REPOSITORY')
    private conduceRepository: Repository<Conduce>,
     @Inject('PREFACTURA_REPOSITORY')
    private preFacturaRepository: Repository<PreFactura>,
   
  ){}
 async create(createConduceProcezadoDto: CreateConduceProcezadoDto): Promise<ConduceProcezado> {
  const foundConduce: Conduce = await this.conduceRepository.findOne({
	  
	   relations: {
        proyecto: true,
    },
    where: {
        
        id: createConduceProcezadoDto.idconduce,
		status:  EstatusConduce.ABIERTO
		
    },
  });
  if(!foundConduce){
    throw new NotFoundException('El conduce no existe');
  }
  const newconduceProcezado: ConduceProcezado = new ConduceProcezado();
  newconduceProcezado.UM = createConduceProcezadoDto.UM;
  newconduceProcezado.cantidad = createConduceProcezadoDto.cantidad;
  newconduceProcezado.proyecto = foundConduce.proyecto;
  newconduceProcezado.precio = createConduceProcezadoDto.precio;
  newconduceProcezado.valorimpuesto = createConduceProcezadoDto.valorimpuesto;
  newconduceProcezado.importe = createConduceProcezadoDto.cantidad * createConduceProcezadoDto.precio;
  newconduceProcezado.importeimpuesto = newconduceProcezado.importe * createConduceProcezadoDto.valorimpuesto;
  newconduceProcezado.subtotal =  createConduceProcezadoDto.precio * createConduceProcezadoDto.cantidad; 
  newconduceProcezado.valortotal = newconduceProcezado.importeimpuesto + newconduceProcezado.importe ;
  newconduceProcezado.nombreServicio = createConduceProcezadoDto.nombreServicio;
  newconduceProcezado.idconduce = createConduceProcezadoDto.idconduce;

  const savedProcezado: ConduceProcezado = await this.conduceprocezadoRepository.save(newconduceProcezado);
  if(!savedProcezado){
    throw new NotFoundException('Error al Insertar');
  }
  foundConduce.status = EstatusConduce.CERRADO;
  await this.conduceRepository.save(foundConduce);
  const newPreFactura: PreFactura = new PreFactura();
  if(!foundConduce.proyecto.ajuste){
     newPreFactura.UM = savedProcezado.UM;
  newPreFactura.cantidad = savedProcezado.cantidad;
  newPreFactura.importe = savedProcezado.importe;
  newPreFactura.importeimpuesto = savedProcezado.importeimpuesto;
  newPreFactura.nombreServicio = savedProcezado.nombreServicio;
  newPreFactura.precio = savedProcezado.precio;
  newPreFactura.proyecto = foundConduce.proyecto;
  newPreFactura.valorimpuesto = savedProcezado.valorimpuesto;
  newPreFactura.valortotal = savedProcezado.valortotal;
newPreFactura.idconduceProcesado = savedProcezado.id;
  await this.preFacturaRepository.save(newPreFactura);

  }
 

  return savedProcezado;




  }

  findAll() {
    return `This action returns all conduceProcezado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conduceProcezado`;
  }

 async update(id: string, updateConduceProcezadoDto: UpdateConduceProcezadoDto):Promise<ConduceProcezado> {

const foundConduceProcesado: ConduceProcezado = await this.conduceprocezadoRepository.findOne({where:{id: id}});
if(!foundConduceProcesado){
  throw new NotFoundException("No existe el conduce ");
}
foundConduceProcesado.precio = updateConduceProcezadoDto.precio;
foundConduceProcesado.importe = foundConduceProcesado.precio * foundConduceProcesado.cantidad;
foundConduceProcesado.importeimpuesto = foundConduceProcesado.importe * foundConduceProcesado.valorimpuesto;
foundConduceProcesado.valortotal = foundConduceProcesado.importe + foundConduceProcesado.importeimpuesto;
foundConduceProcesado.updatedAt = new Date();

const savedConduceProcesado: ConduceProcezado = await this.conduceprocezadoRepository.save(foundConduceProcesado);
if(savedConduceProcesado){

  const foundPrefactura: PreFactura = await this.preFacturaRepository.findOne({where:{idconduceProcesado: savedConduceProcesado.id}});
  if( foundPrefactura ){

    foundPrefactura.precio = savedConduceProcesado.precio;    
    foundPrefactura.importe = foundPrefactura.precio * foundPrefactura.cantidad;
    foundPrefactura.importeimpuesto = foundPrefactura.importe * foundPrefactura.valorimpuesto;
    foundPrefactura.valortotal = foundPrefactura.importe + foundPrefactura.importeimpuesto;
    foundPrefactura.updatedAt = new Date();
    await this.preFacturaRepository.save(foundPrefactura);



  }
}

return savedConduceProcesado;
 
  }
  async updateByIdConduce(id: string, updateConduceProcezadoDto: UpdateConduceProcezadoDto):Promise<ConduceProcezado> {

const foundConduceProcesado: ConduceProcezado = await this.conduceprocezadoRepository.findOne({where:{idconduce: id}});
if(!foundConduceProcesado){
  throw new NotFoundException("No existe el conduce ");
}
foundConduceProcesado.cantidad = updateConduceProcezadoDto.cantidad;
foundConduceProcesado.UM = updateConduceProcezadoDto.UM;
foundConduceProcesado.precio = updateConduceProcezadoDto.precio;
foundConduceProcesado.importe = foundConduceProcesado.precio * foundConduceProcesado.cantidad;
foundConduceProcesado.valorimpuesto = updateConduceProcezadoDto.valorimpuesto;
foundConduceProcesado.importeimpuesto = foundConduceProcesado.importe * foundConduceProcesado.valorimpuesto;
foundConduceProcesado.valortotal = foundConduceProcesado.importe + foundConduceProcesado.importeimpuesto;
foundConduceProcesado.updatedAt = new Date();

const savedConduceProcesado: ConduceProcezado = await this.conduceprocezadoRepository.save(foundConduceProcesado);
if(savedConduceProcesado){

  const foundPrefactura: PreFactura = await this.preFacturaRepository.findOne({where:{idconduceProcesado: savedConduceProcesado.id}});
  if( foundPrefactura ){
    foundPrefactura.cantidad = updateConduceProcezadoDto.cantidad;
    foundPrefactura.UM = updateConduceProcezadoDto.UM;

    foundPrefactura.precio = savedConduceProcesado.precio;    
    foundPrefactura.importe = foundPrefactura.precio * foundPrefactura.cantidad;
    foundPrefactura.valorimpuesto = updateConduceProcezadoDto.valorimpuesto;
    foundPrefactura.importeimpuesto = foundPrefactura.importe * foundPrefactura.valorimpuesto;
    foundPrefactura.valortotal = foundPrefactura.importe + foundPrefactura.importeimpuesto;
    foundPrefactura.updatedAt = new Date();
    await this.preFacturaRepository.save(foundPrefactura);



  }
}

return savedConduceProcesado;
 
  }

  remove(id: number) {
    return `This action removes a #${id} conduceProcezado`;
  }
}
