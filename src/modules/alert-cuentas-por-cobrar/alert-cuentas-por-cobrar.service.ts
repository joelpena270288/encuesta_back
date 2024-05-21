import { Inject, Injectable } from '@nestjs/common';
import { Factura } from '../factura/entities/factura.entity';
import { ReadAlertDTO } from './dto/read-alert.dto';
import { StatusFactura } from '../factura/entities/fatura-status.enum';
import { TipoPagoFactura } from '../factura/entities/factura-tipo-pago.enum';
import * as moment from 'moment';
import { Repository } from 'typeorm';

@Injectable()
export class AlertCuentasPorCobrarService {
  constructor(
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
  ) {}
 

async  findAll(): Promise<ReadAlertDTO[]> {
const readAlert: ReadAlertDTO[] = [];
  const facturas: Factura[] = await this.facturaRepository
  .createQueryBuilder('factura')
 
  .where('factura.status = :status', {
    status: StatusFactura.APROBADA,    
  })
  .andWhere('factura.tipoPago = :tipoPago',{
   tipoPago: TipoPagoFactura.CREDITO

  })
 .getMany();

 if(facturas){
  const fin = moment(new Date(), "YYYY-MM-DD");
  for (let index = 0; index < facturas.length; index++) {
    const inicio = moment(facturas[index].fechafactura, "YYYY-MM-DD");   
    const diferencia = fin.diff(inicio,'days');
   const evaluate = facturas[index].dias - 7 ;
   
    if(diferencia >= evaluate ){
    const newread: ReadAlertDTO = new ReadAlertDTO();
    newread.consecutivo = facturas[index].consecutivofactura;
    newread.acuerdo =   facturas[index].dias;
    newread.creacion =  inicio;
    newread.dias = facturas[index].dias - diferencia ;
    if(newread.dias > 0){
      newread.estado = "Por vencer";
    }else{
      newread.estado = "Vencida";

    }
    readAlert.push(newread);
    }
    
  }


 }

 return readAlert;

 
   
  }
  async  findAllByIdCliente(id: string): Promise<ReadAlertDTO[]> {
    const readAlert: ReadAlertDTO[] = [];
      const facturas: Factura[] = await this.facturaRepository
      .createQueryBuilder('factura')
      .innerJoinAndSelect(
        'factura.cliente',
        'cliente',
       
      )
      .where('factura.status = :status', {
        status: StatusFactura.APROBADA,    
      })
      .andWhere('factura.tipoPago = :tipoPago',{
       tipoPago: TipoPagoFactura.CREDITO
    
      })
      .andWhere('cliente.id = :idcliente',{
        idcliente: id
     
       })
     .getMany();
    
     if(facturas){
      const fin = moment(new Date(), "YYYY-MM-DD");
      for (let index = 0; index < facturas.length; index++) {
        const inicio = moment(facturas[index].fechafactura, "YYYY-MM-DD");   
        const diferencia = fin.diff(inicio,'days');
       const evaluate = facturas[index].dias - 7 ;
       
        if(diferencia >= evaluate ){
        const newread: ReadAlertDTO = new ReadAlertDTO();
        newread.consecutivo = facturas[index].consecutivofactura;
        newread.acuerdo =   facturas[index].dias;
        newread.creacion =  inicio;
        newread.dias = facturas[index].dias - diferencia ;
        if(newread.dias > 0){
          newread.estado = "Por vencer";
        }else{
          newread.estado = "Vencida";
    
        }
        readAlert.push(newread);
        }
        
      }
    
    
     }
    
     return readAlert;

 
}
}