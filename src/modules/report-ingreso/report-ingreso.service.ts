import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import{ReadReportIngresoDto} from './dto/read-report-ingreso.dto';
import{FiltroFechaDto} from './dto/filtro-fecha.dto';
import { Factura } from '../factura/entities/factura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportIngresoService {
  constructor(
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
   
  ) {}
async getReportByDate(filtroFechaDto: FiltroFechaDto): Promise<ReadReportIngresoDto> {
  if(filtroFechaDto.start == null|| filtroFechaDto.end == null){
    throw new BadRequestException("Debe introducir una fecha inicio y una fecha fin");
  }
  const readReportIngresoDto: ReadReportIngresoDto = new ReadReportIngresoDto();
  readReportIngresoDto.ingresos = 0;
  readReportIngresoDto.pagos = 0;
  const factura: Factura[] = await this.facturaRepository.createQueryBuilder('factura')
  .orderBy('factura.fechafactura',"DESC" )
  .innerJoinAndSelect('factura.cuentaporcobrar','cuentaporcobrar')  
  .where('factura.fechafactura >= :start',{start: filtroFechaDto.start+' 00:00:00'}) 
  .andWhere('factura.fechafactura  <= :end',{end: filtroFechaDto.end+' 23:59:00'}) 
  .getMany();
   if(factura){
   for (let index = 0; index < factura.length; index++) {
   readReportIngresoDto.ingresos = parseFloat(readReportIngresoDto.ingresos.toString() ) + parseFloat(factura[index].cuentaporcobrar.montoinicial.toString()); 
   readReportIngresoDto.pagos = parseFloat(readReportIngresoDto.pagos.toString()) + parseFloat(factura[index].cuentaporcobrar.montoinicial.toString()) - parseFloat(factura[index].cuentaporcobrar.montorestante.toString())
   readReportIngresoDto.pendientes =  parseFloat(factura[index].cuentaporcobrar.montorestante.toString());
   }

   }
 
    return readReportIngresoDto;
  }

 
}
