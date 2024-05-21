import { Inject, Injectable } from '@nestjs/common';

import { FacturaResumen} from './dto/facturas.dto';
import { Repository } from 'typeorm';
import { Factura } from '../factura/entities/factura.entity';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { ReadReport07Dto } from './dto/read-report-07.dto';
import { StatusFactura } from '../factura/entities/fatura-status.enum';
import * as moment from 'moment';
@Injectable()
export class Report07Service {
  constructor(
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
   
   
   
  ) {}
  async getReport07(filtroFechaDto: FiltroFechaDto):Promise<ReadReport07Dto> {
    const readReport07Dto: ReadReport07Dto = new ReadReport07Dto();
    readReport07Dto.facturasResumen = [];
   
      const factura: Factura[] = await this.facturaRepository.createQueryBuilder('factura')
      
      .orderBy('factura.fechafactura',"DESC" )
    .innerJoinAndSelect('factura.servicioProcesado','servicioProcesado')  
    .innerJoinAndSelect('factura.cliente','cliente') 
    .where('factura.fechafactura >= :start',{start: filtroFechaDto.start+' 00:00:00'}) 
    .andWhere('factura.fechafactura  <= :end',{end: filtroFechaDto.end+' 23:59:00'}) 
    .andWhere('factura.status  = :estado',{estado: StatusFactura.APROBADA}) 
    .andWhere('factura.tipoimpuesto  != :tipoimpuesto',{tipoimpuesto: 'B02'}) 
    .getMany();  
 
   
  
  if(factura){
  for (let index = 0; index < factura.length; index++) {
    const facturaResumen : FacturaResumen = new  FacturaResumen();
    facturaResumen.itbis = 0;
    facturaResumen.monto = 0;
    facturaResumen.comprobante = factura[index].ncf;
    facturaResumen.fechacomprobante = moment( factura[index].fechancf).format("YYYY-MM-DD");
    facturaResumen.formapago = factura[index].tipoPago;
    facturaResumen.rnc = factura[index].cliente.rcn;
    facturaResumen.tipoidentificacion = factura[index].cliente.tipoDocumento;
   for(let jindex = 0; jindex < factura[index].servicioProcesado.length; jindex ++ ){
   facturaResumen.itbis = parseFloat(facturaResumen.itbis.toString()) + parseFloat( factura[index].servicioProcesado[jindex].importeimpuesto.toString());
   facturaResumen.monto = parseFloat(facturaResumen.monto.toString()) + parseFloat(factura[index].servicioProcesado[jindex].importe.toString())
   
  
   }
   facturaResumen.itbis.toFixed(2);
   facturaResumen.monto.toFixed(2);
   readReport07Dto.facturasResumen.push(facturaResumen);
    
  }
  
  }
  return readReport07Dto;
     
    }
  
}
