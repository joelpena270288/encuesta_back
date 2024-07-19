import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { ReadCompetenciaDto } from './dto/read-competencia.dto';

import { Vendedor } from '../vendedor/entities/vendedor.entity';
import { Repository } from 'typeorm';
import { Venta } from '../venta/entities/venta.entity';
import { RangoDescuesto } from '../grupo/entities/rango-descuesto.entity';
import { RangoEncuesta } from '../grupo/entities/rango-encuesta.entity';
import { RangoVenta } from '../grupo/entities/rango-venta.entity';
import { Kpi } from '../kpi/entities/kpi.entity';
import { GenerarCompetencia } from './dto/generar-competencia.dto';
import { ReadVendedorCompetencia } from './dto/read-vendedor-competencia.dto';
import * as moment from 'moment';
import { Status } from '../../EntityStatus/entity.estatus.enum';
@Injectable()
export class CompetenciaService {
  constructor(
    @Inject('VENDEDOR_REPOSITORY')
    private vendedorRepository: Repository<Vendedor>,
    @Inject('KPI_REPOSITORY')
    private kpiRepository: Repository<Kpi>,
  ) {}

  async create(
    generarCompetencia: GenerarCompetencia,
  ): Promise<ReadCompetenciaDto> {
    const foundKpi: Kpi = await this.kpiRepository.findOne({
      where: { id: generarCompetencia.idKpi },
    });
    if (!foundKpi) {
      throw new NotAcceptableException('No existe el Kpi');
    }

    const readCompetenciaDtoList: ReadCompetenciaDto = new ReadCompetenciaDto();
    readCompetenciaDtoList.vendedores = [];
    const findvendedores: Vendedor[] = await this.vendedorRepository
      .createQueryBuilder('vendedor')
      .innerJoinAndSelect('vendedor.grupo', 'grupo')
      .innerJoinAndSelect('grupo.rangoDescueto', 'rangoDescueto')
      .innerJoinAndSelect('grupo.rangoEncuesta', 'rangoEncuesta')
      .innerJoinAndSelect('grupo.rangoVenta', 'rangoVenta')
      .innerJoinAndSelect('vendedor.ventas', 'venta')      
      .innerJoinAndSelect('venta.vehiculo', 'vehiculo')
      .innerJoinAndSelect('vehiculo.model', 'model','model.competencia = :competenciaModelo',{competenciaModelo: true})
      .innerJoinAndSelect('model.marca', 'marca','marca.competencia = :competenciaMarca',{competenciaMarca: true})
      .leftJoinAndSelect('venta.cuestionarios', 'cuestionario')
      .leftJoinAndSelect(
        'cuestionario.encuesta','encuesta',
        'encuesta.id = :idencuesta',
        { idencuesta: generarCompetencia.idEncuesta },
      )
      .where('venta.fecha >= :start', {
        start: generarCompetencia.filtroFecha.start + ' 00:00:00',
      })
      .andWhere('venta.fecha  <= :end', {
        end: generarCompetencia.filtroFecha.end + ' 23:59:00',
      })
      .andWhere('venta.status = :estado', {
        estado: Status.ACTIVO,
      }) 
      .andWhere('grupo.competencia = :competencia',{
        competencia: true
      })    
     
      .getMany();
     

    findvendedores.forEach((item) => {
      const cantidadVenta = item.ventas.length;
      let aux = item.ventas.length;
      let cantidadCuestionarios = 0;
      let descuento = 0;
      let notaCuestionario = 0;
      const rangoDescueto: RangoDescuesto[] = item.grupo.rangoDescueto;
      const rangoEncuesta: RangoEncuesta[] = item.grupo.rangoEncuesta;
      const rangoVenta: RangoVenta[] = item.grupo.rangoVenta;
     
  
      const ventasList: Venta[] = item.ventas;
      let indiceDescuento = 0;
      let indiceNota = 0;
      let indiceVenta = 0;
      ventasList.forEach(element => {
        
        if(element.precioVenta != element.precioFinVenta){
          descuento += 1;
      
        }
        element.cuestionarios.forEach((cuestionario)=>{
       notaCuestionario+= cuestionario.resultado;
       cantidadCuestionarios+=1;
      
        }     
      
        );   
      
      });
      rangoDescueto.forEach((rdescuento) => {
        if(rdescuento.min<= descuento && rdescuento.max>= descuento){
          indiceDescuento = rdescuento.valor * foundKpi.indiceDescuesto;
        
        }
        });
        
        rangoEncuesta.forEach((rencuesta)=>{
          const promedio = notaCuestionario/cantidadCuestionarios;
        if(rencuesta.min< promedio  &&  rencuesta.max>= promedio){
        indiceNota = rencuesta.valor * foundKpi.indiceEncuesta;
        
        }
        
        });
        while (aux>0 ) {
        rangoVenta.forEach((rventa)=>{
       if(rventa.min<=aux && rventa.max>=aux){
        const dif = aux - rventa.min;
        indiceVenta += dif * rventa.valor * foundKpi.indiceVenta;
        aux -= dif;
       }

        });
       
      }

      
       
      
     
          
         
          const readVendedor: ReadVendedorCompetencia = new ReadVendedorCompetencia();        
          
          readVendedor.cantidadVentas = cantidadVenta ;
          readVendedor.nombre = item.name;
          readVendedor.apellido = item.lastname;        
         readVendedor.resultadoKpi = indiceDescuento + indiceNota + indiceVenta;
          readVendedor.resultadoDescuento =   indiceDescuento;
          readVendedor.resultadoEncuesta = indiceNota; 
          readVendedor.resultadoVentas = indiceVenta;
          readVendedor.color = item.grupo.color;
          readVendedor.grupo = item.grupo.name;
          readVendedor.cantidadDescuento = descuento;
          readVendedor.cantidadEncuesta = cantidadCuestionarios;
          readCompetenciaDtoList.vendedores.push(readVendedor);
          

    });
     readCompetenciaDtoList.vendedores.sort((n1,n2)=>{
      if(n1.resultadoKpi>n2.resultadoKpi){
        return -1;
      }else if(n1.resultadoKpi < n2.resultadoKpi){
        return 1;
      }else{
        return 0;
      }
     });
    return readCompetenciaDtoList;
  }

}
