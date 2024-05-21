import { Inject, Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Repository,Not, MoreThanOrEqual,Between } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { StatusFactura } from './entities/fatura-status.enum';
import {Proyecto} from '../proyecto/entities/proyecto.entity';
import { PreFactura } from '../pre-factura/entities/pre-factura.entity';
import { ServicioProcesado } from '../servicio-procesado/entities/servicio-procesado.entity';
import { TipoFactura } from './entities/factura-tipo.enum';
import { UpdateClientePrefacturaDto } from './dto/update-cliente-factura';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { ConvertFacturaDto } from './dto/convert-factura.dto';
import {TipoImpuestoFactura} from './entities/factura-impuesto.enum'
import { B01 } from '../b01/entities/b01.entity';
import { B02 } from '../b02/entities/b02.entity';
import { B14 } from '../b14/entities/b14.entity';
import { CuentasPorCobrar } from './entities/cuenta-por-cobrar.entity';
import { UpdateNotaFacturaDto } from './dto/update-note-factura.dto';
import { Moneda } from '../moneda/entities/moneda.entity';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
@Injectable()
export class FacturaService {

  constructor(
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('PREFACTURA_REPOSITORY')
    private prefacturaRepository: Repository<PreFactura>,
    @Inject('SERVICIOPROCESADO_REPOSITORY')
    private servicioProcesadoRepository: Repository<ServicioProcesado>,
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
	 @Inject('B01_REPOSITORY')
    private b01Repository: Repository<B01>,
	 @Inject('B02_REPOSITORY')
    private b02Repository: Repository<B02>,
	 @Inject('B14_REPOSITORY')
    private b14Repository: Repository<B14>,
	 @Inject('MONEDA_REPOSITORY')
    private monedaRepository: Repository<Moneda>,
   
  ){}
 async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {

  const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where:{id: createFacturaDto.idProyecto}});
 if(!foundProyecto){
  throw new NotFoundException("No existe el proyecto");
 }
 if(createFacturaDto.prefacturas.length <1){
  throw new BadRequestException("No se puede crear una Factura Proforma sin servicios");
 }
 const preanterior: Factura = await this.facturaRepository.createQueryBuilder('factura')
  .addOrderBy('factura.consecutivoprefactura','DESC')
   
  .getOne();


 const newFactura: Factura = new Factura();
 if(!preanterior){
  newFactura.consecutivoprefactura = 1;

}else{
  newFactura.consecutivoprefactura = preanterior.consecutivoprefactura +1;
}
const cuentaporcobrar: CuentasPorCobrar = new CuentasPorCobrar();

 newFactura.tipo = TipoFactura.PREFACTURA;
 newFactura.status = StatusFactura.CREADA;
 newFactura.proyecto = foundProyecto;
 newFactura.nombreproyecto = foundProyecto.name;
 newFactura.cliente = foundProyecto.cliente;
 newFactura.cuentaporcobrar = cuentaporcobrar;
 const savedFactura: Factura = await this.facturaRepository.save(newFactura);
 if(!savedFactura){
  throw new NotFoundException("Error al crear la Prefactura");
 }
 for (let index = 0; index < createFacturaDto.prefacturas.length; index++) {
  const foundPreFactura: PreFactura = await this.prefacturaRepository.findOne({where:{id: createFacturaDto.prefacturas[index].id}});
  if(foundPreFactura){
   if(foundPreFactura.cantidad >= parseFloat( createFacturaDto.prefacturas[index].cantidad.toString())){
	   
    foundPreFactura.cantidad = parseFloat(foundPreFactura.cantidad.toString()) - parseFloat( createFacturaDto.prefacturas[index].cantidad.toString());
     const servicioProcesado: ServicioProcesado = new ServicioProcesado();
      servicioProcesado.UM = foundPreFactura.UM;
      servicioProcesado.cantidad = createFacturaDto.prefacturas[index].cantidad;
      servicioProcesado.importe = foundPreFactura.precio *   servicioProcesado.cantidad;
      servicioProcesado.importeimpuesto = servicioProcesado.importe * foundPreFactura.valorimpuesto;
      servicioProcesado.nombreServicio = foundPreFactura.nombreServicio;
      servicioProcesado.precio = foundPreFactura.precio;
      servicioProcesado.valorimpuesto = foundPreFactura.valorimpuesto;
      servicioProcesado.valortotal =  parseFloat(servicioProcesado.importe.toString()) +  parseFloat(servicioProcesado.importeimpuesto.toString());
      servicioProcesado.factura = savedFactura;
      servicioProcesado.idprefactura = foundPreFactura.id;

     const savedServicio: ServicioProcesado =  await this.servicioProcesadoRepository.save(servicioProcesado);
      if(savedServicio){
        foundPreFactura.importe = foundPreFactura.cantidad;
        foundPreFactura.importeimpuesto = foundPreFactura.importe * foundPreFactura.valorimpuesto;
        foundPreFactura.valortotal = parseFloat(foundPreFactura.importe.toString()) + parseFloat(foundPreFactura.importeimpuesto.toString());
        await this.prefacturaRepository.save(foundPreFactura);
      }

   }else {
	   throw new BadRequestException("La cantidad suministrada es mayor a la disponible");
   }

  }


 }

return savedFactura;
  
  }
  
  
   async createOptional(createFacturaDto: CreateFacturaDto): Promise<Factura> {

  const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where:{id: createFacturaDto.idProyecto}});
 if(!foundProyecto){
  throw new NotFoundException("No existe el proyecto");
 }
 const preanterior: Factura = await this.facturaRepository.createQueryBuilder('factura')
  .addOrderBy('factura.consecutivoprefactura','DESC')
   
  .getOne();


 const newFactura: Factura = new Factura();
 if(!preanterior){
  newFactura.consecutivoprefactura = 1;

}else{
  newFactura.consecutivoprefactura = preanterior.consecutivoprefactura +1;
}
const cuentaporcobrar: CuentasPorCobrar = new CuentasPorCobrar();

 newFactura.tipo = TipoFactura.PREFACTURA;
 newFactura.status = StatusFactura.CREADA;
 newFactura.proyecto = foundProyecto;
 newFactura.nombreproyecto = foundProyecto.name;
 newFactura.cliente = foundProyecto.cliente;
 newFactura.cuentaporcobrar = cuentaporcobrar;
 const savedFactura: Factura = await this.facturaRepository.save(newFactura);
 if(!savedFactura){
  throw new NotFoundException("Error al crear la Prefactura");
 }
 for (let index = 0; index < createFacturaDto.prefacturas.length; index++) {
 
     const prefactura: PreFactura = new PreFactura();
	   prefactura.UM = createFacturaDto.prefacturas[index].UM;
       prefactura.cantidad = 0;
	   prefactura.precio = createFacturaDto.prefacturas[index].precio;
      prefactura.importe = prefactura.precio *  prefactura.cantidad;
	  prefactura.valorimpuesto = createFacturaDto.prefacturas[index].valorimpuesto;
      prefactura.importeimpuesto = prefactura.importe *  prefactura.valorimpuesto ;
      prefactura.nombreServicio = createFacturaDto.prefacturas[index].nombreServicio; 
      prefactura.valortotal =  parseFloat(prefactura.importe.toString()) +  parseFloat(prefactura.importeimpuesto.toString());
     prefactura.proyecto = foundProyecto;
	  
	  const savedPrefactura: PreFactura = await this.prefacturaRepository.save(prefactura);
	  if(!savedPrefactura){
		throw new NotFoundException("Error al crear la Prefactura");  
		  
	  }
	  
   
     const servicioProcesado: ServicioProcesado = new ServicioProcesado();
      servicioProcesado.UM = createFacturaDto.prefacturas[index].UM;
      servicioProcesado.cantidad = createFacturaDto.prefacturas[index].cantidad;
	   servicioProcesado.precio = createFacturaDto.prefacturas[index].precio;
      servicioProcesado.importe = servicioProcesado.precio *  servicioProcesado.cantidad;
	  servicioProcesado.valorimpuesto = createFacturaDto.prefacturas[index].valorimpuesto;
      servicioProcesado.importeimpuesto = servicioProcesado.importe *  servicioProcesado.valorimpuesto ;
      servicioProcesado.nombreServicio = createFacturaDto.prefacturas[index].nombreServicio;  
      
      servicioProcesado.valortotal =  parseFloat(servicioProcesado.importe.toString()) +  parseFloat(servicioProcesado.importeimpuesto.toString());
      servicioProcesado.factura = savedFactura;
      servicioProcesado.idprefactura = savedPrefactura.id;

     const savedServicio: ServicioProcesado =  await this.servicioProcesadoRepository.save(servicioProcesado);


  

  


 }

return savedFactura;
  
  }
  
 
 async findAll(): Promise<Factura[]> {
       return await this.facturaRepository.find({
      relations: {
        cliente: true
		
        
    },
	
	where:{
		status: Not(StatusFactura.CANCELADA)
	}
    
    });
  }

 async findOne(id: string) {
    return await this.facturaRepository.findOne({
      relations: {
        servicioProcesado: true,	
    cliente: true
		
		
        
    },
	where:{
		id: id,
		status: Not(StatusFactura.CANCELADA)
    
	}
    
    });
  }

  update(id: string, updateFacturaDto: UpdateFacturaDto) {
	  
	  
    return `This action updates a #${id} factura`;
  }
 async tipob01(idfactura: string, convertFacturaDto: ConvertFacturaDto  ): Promise<Factura>{
	 
	  if(convertFacturaDto.idncf < 1 ){
		  
		  throw new BadRequestException("Debe enviar introducir el concecutivo");
	  }
	  
	  if(convertFacturaDto.idmoneda==""){
		  
		  throw new BadRequestException('Debe introducir el tipo de moneda')
	  }
	  
	  const moneda: Moneda = await this.monedaRepository.findOne({where:{id: convertFacturaDto.idmoneda,status: Status.ACTIVO}});
	  if(!moneda){
		  throw new NotFoundException('La moneda introducida no esta registrada o esta desabilitada');  
	  }
	  
	  const b01: B01 = await this.b01Repository.findOne({where:{id: convertFacturaDto.idncf,status: Status.ACTIVO}});
	  if(!b01){
		throw new NotFoundException('El CNF introducido no es valido');  
		  
	  }
	  
	  const foundFactura = await  this.facturaRepository.findOne({where: {
     id: idfactura,
     status: Not(StatusFactura.CANCELADA),
     tipo:  TipoFactura.PREFACTURA
    
    }});
    if(!foundFactura){
      throw new NotFoundException('La Prefactura no existe');
    }

    let monto = 0;

  for (let index = 0; index < foundFactura.servicioProcesado.length; index++) {
    monto = monto + parseFloat( foundFactura.servicioProcesado[index].valortotal.toString());
    
  }
  const preanterior: Factura = await this.facturaRepository.createQueryBuilder('factura')
  .addOrderBy('factura.consecutivofactura','DESC')
   
  .getOne();
  if(!preanterior){
    foundFactura.consecutivofactura = 1;

  }else{
    foundFactura.consecutivofactura = preanterior.consecutivofactura +1;
  }
   foundFactura.simbolomoneda = moneda.valor;
	  foundFactura.tasadia = moneda.tasa;
    if( parseFloat(moneda.tasa.toString()) > 1 ){
      foundFactura.cuentaporcobrar.montoinicial = parseFloat(monto.toString())/ parseFloat(moneda.tasa.toString()); 
      foundFactura.cuentaporcobrar.montorestante = parseFloat(monto.toString())/ parseFloat(moneda.tasa.toString());
    }else{
      foundFactura.cuentaporcobrar.montoinicial = monto; 
      foundFactura.cuentaporcobrar.montorestante = monto;
    }
  
	
   foundFactura.status = StatusFactura.APROBADA;
	foundFactura.tipo = TipoFactura.FACTURA;
	foundFactura.tipoimpuesto = TipoImpuestoFactura.B01;
	foundFactura.fechafactura = new Date();
	foundFactura.ncf = b01.valor;
	foundFactura.fechancf = b01.fecha;
  foundFactura.tipoPago = convertFacturaDto.tipopago;
	foundFactura.dias = parseInt(convertFacturaDto.dias.toString());
	const saved: Factura = await this.facturaRepository.save(foundFactura);
	if(saved){
		
		b01.status = Status.INACTIVO;
		
		await this.b01Repository.save(b01);
	}
	return saved;
	
	
	
	  
  }
  
 async tipob02(idfactura: string, convertFacturaDto: ConvertFacturaDto  ): Promise<Factura>{
	  if(convertFacturaDto.idncf <1 ){
		  
		  throw new BadRequestException("Debe enviar todos los datos");
	  }
	  
	   const b02: B02 = await this.b02Repository.findOne({where:{id: convertFacturaDto.idncf}});
	  if(!b02){
		throw new NotFoundException('El CNF introducido no es valido');  
		  
	  }
	   if(convertFacturaDto.idmoneda==""){
		  
		  throw new BadRequestException('Debe introducir el tipo de moneda')
	  }
	  
	  const moneda: Moneda = await this.monedaRepository.findOne({where:{id: convertFacturaDto.idmoneda,status: Status.ACTIVO}});
	  if(!moneda){
		  throw new NotFoundException('La moneda introducida no esta registrada o esta desabilitada');  
	  }
	  
	  const foundFactura: Factura = await  this.facturaRepository.findOne({where: {
     id: idfactura,
     status: Not(StatusFactura.CANCELADA),
     tipo:  TipoFactura.PREFACTURA
    
    }});
    if(!foundFactura){
      throw new NotFoundException('La Prefactura no existe');
    }
    let monto = 0;

    for (let index = 0; index < foundFactura.servicioProcesado.length; index++) {
      monto = monto + parseFloat( foundFactura.servicioProcesado[index].valortotal.toString());
      
    }
    const preanterior: Factura = await this.facturaRepository.createQueryBuilder('factura')
  .addOrderBy('factura.consecutivofactura','DESC')
   
  .getOne();
  if(!preanterior){
    foundFactura.consecutivofactura = 1;

  }else{
    foundFactura.consecutivofactura = preanterior.consecutivofactura +1;
  }
      foundFactura.simbolomoneda = moneda.valor;
	  foundFactura.tasadia = moneda.tasa;
     foundFactura.cuentaporcobrar.montoinicial = monto; 
     foundFactura.cuentaporcobrar.montorestante = monto;
	foundFactura.status = StatusFactura.APROBADA;
	foundFactura.tipo = TipoFactura.FACTURA;
	foundFactura.tipoimpuesto = TipoImpuestoFactura.B02;
	foundFactura.fechafactura = new Date();
	foundFactura.ncf = b02.valor;
	foundFactura.fechancf = b02.fecha;
	foundFactura.tipoPago = convertFacturaDto.tipopago;
  foundFactura.dias = parseInt(convertFacturaDto.dias.toString());
	const saved: Factura = await this.facturaRepository.save(foundFactura);
	if(saved){
		
		b02.status = Status.INACTIVO;
		
		await this.b02Repository.save(b02);
	}
	return saved;
	
	
	
	  
  }
 async tipob14(idfactura: string, convertFacturaDto: ConvertFacturaDto  ): Promise<Factura>{
	   if(convertFacturaDto.idncf < 1 ){
		  
		  throw new BadRequestException("Debe enviar todos los datos");
	  }
	   const b14: B14 = await this.b14Repository.findOne({where:{id: convertFacturaDto.idncf}});
	  if(!b14){
		throw new NotFoundException('El CNF introducido no es valido');  
		  
	  }
	   if(convertFacturaDto.idmoneda==""){
		  
		  throw new BadRequestException('Debe introducir el tipo de moneda')
	  }
	  
	  const moneda: Moneda = await this.monedaRepository.findOne({where:{id: convertFacturaDto.idmoneda,status: Status.ACTIVO}});
	  if(!moneda){
		  throw new NotFoundException('La moneda introducida no esta registrada o esta desabilitada');  
	  }
	  const foundFactura: Factura = await  this.facturaRepository.findOne({where: {
     id: idfactura,
     status: Not(StatusFactura.CANCELADA),
     tipo:  TipoFactura.PREFACTURA
    
    }});
    if(!foundFactura){
      throw new NotFoundException('La Prefactura no existe');
    }
    let monto = 0;

    for (let index = 0; index < foundFactura.servicioProcesado.length; index++) {
     monto = monto + parseFloat( foundFactura.servicioProcesado[index].valortotal.toString());
      
    }
    const preanterior: Factura = await this.facturaRepository.createQueryBuilder('factura')
  .addOrderBy('factura.consecutivofactura','DESC')
   
  .getOne();
  if(!preanterior){
    foundFactura.consecutivofactura = 1;

  }else{
    foundFactura.consecutivofactura = preanterior.consecutivofactura +1;
  }
   foundFactura.simbolomoneda = moneda.valor;
	  foundFactura.tasadia = moneda.tasa;
  foundFactura.cuentaporcobrar.montoinicial = monto; 
  foundFactura.cuentaporcobrar.montorestante = monto;
	foundFactura.status = StatusFactura.APROBADA;
	foundFactura.tipo = TipoFactura.FACTURA;
	foundFactura.tipoimpuesto = TipoImpuestoFactura.B14;
	foundFactura.fechafactura = new Date();
	foundFactura.ncf = b14.valor;
	foundFactura.fechancf = b14.fecha;
	foundFactura.tipoPago = convertFacturaDto.tipopago;
  foundFactura.dias = parseInt(convertFacturaDto.dias.toString());
	const saved: Factura = await this.facturaRepository.save(foundFactura);
	if(saved){
		
		b14.status = Status.INACTIVO;
		
		await this.b14Repository.save(b14);
	}
	return saved;
	
	  
  }



  async updateCliente(idfactura: string, updateClientePrefacturaDto: UpdateClientePrefacturaDto): Promise<Factura>{

 const foundFactura = await  this.facturaRepository.findOne({where: {
     id: idfactura,
     status: Not(StatusFactura.CANCELADA),
     tipo:  TipoFactura.PREFACTURA
    
    }});
    if(!foundFactura){
      throw new NotFoundException('La Prefactura no existe');
    }

    const foundCliente: Cliente = await this.clienteRepository.findOne({where: {
      id: updateClientePrefacturaDto.idcliente,
      status: Status.ACTIVO
    }});
    if(!foundCliente){
      throw new NotFoundException("El Cliente introducido no es valido");
    }
    foundFactura.cliente = foundCliente;
    const savedPrefactura: Factura = await this.facturaRepository.save(foundFactura);
    if(!savedPrefactura){
      throw new BadRequestException("Error al modificar la Prefactura");
    }
    return savedPrefactura;

  }

 async remove(id: string): Promise<Factura> {
    const foundFactura: Factura =   await this.facturaRepository.findOne({
        relations: {
          servicioProcesado: true,	
      },
    where:{
      id: id,
      status: Not(StatusFactura.CANCELADA),
      tipo:  TipoFactura.PREFACTURA
      
    }
      
      });
 if(!foundFactura){
    throw new NotFoundException('La factura no existe o esta aprobada');
  }
 for (let index = 0; index < foundFactura.servicioProcesado.length; index++) {
  const foudPrefactura: PreFactura = await this.prefacturaRepository.findOne({where:{id: foundFactura.servicioProcesado[index].idprefactura}});
  if(foudPrefactura){
    foudPrefactura.cantidad = parseFloat(foudPrefactura.cantidad.toString()) + parseFloat(foundFactura.servicioProcesado[index].cantidad.toString());
    foudPrefactura.importe = foudPrefactura.cantidad * foudPrefactura.precio;
    foudPrefactura.importeimpuesto = foudPrefactura.importe * foudPrefactura.valorimpuesto;
    foudPrefactura.valortotal = foudPrefactura.importe + foudPrefactura.importeimpuesto;
    foudPrefactura.updatedAt = new Date();
    await this.prefacturaRepository.save(foudPrefactura);    
  }
 }

 foundFactura.status = StatusFactura.CANCELADA;
 foundFactura.updatedAt = new Date();



    return await this.facturaRepository.save(foundFactura);
  }
 async aprobar(id: string):Promise<Factura>{

 const foundFactura: Factura = await this.facturaRepository.findOne({where:{id: id, status: StatusFactura.CREADA}});
  
 if(!foundFactura){
    throw new NotFoundException('La factura no existe o esta aprobada');
  }
  foundFactura.status = StatusFactura.APROBADA;
  return await this.facturaRepository.save(foundFactura);

  }
async notaPrefactura(id: string,updateNotaFacturaDto: UpdateNotaFacturaDto): Promise<boolean>{
	
	const foundFactura: Factura = await this.facturaRepository.findOne({where:{id: id, status: StatusFactura.CREADA}});
	
	foundFactura.notaprefactura = updateNotaFacturaDto.nota;
	
	
	
   const	saved: Factura = await this.facturaRepository.save(foundFactura);
   if(!saved){
	   throw new BadRequestException("Error al Crear La nota");
   }
   return true;
	
}
async notaFactura(id: string,updateNotaFacturaDto: UpdateNotaFacturaDto): Promise<boolean>{
	
	const foundFactura: Factura = await this.facturaRepository.findOne({where:{id: id, status: StatusFactura.APROBADA}});
	
	foundFactura.notafactura = updateNotaFacturaDto.nota;
	console.log(foundFactura.notafactura);
	
	
   const	saved: Factura = await this.facturaRepository.save(foundFactura);
   if(!saved){
	   throw new BadRequestException("Error al Crear La nota");
   }
   return true;
	
}
async getCuentasPorCobrar(): Promise<Factura[]>{
	
	const facturas: Factura[] = await this.facturaRepository.find({
    relations: {
      cliente: true,
	  cuentaporcobrar: true,
	  servicioProcesado: true
  },
  where: {
      cuentaporcobrar: {
          status: Status.ACTIVO,
        
        
      },
    status:   StatusFactura.APROBADA
    
 
  },
  });
  return facturas;
}

async getCuentasPorCobrarByIdCliente(id: string): Promise<Factura[]>{
	
	const facturas: Factura[] = await this.facturaRepository.find({
    relations: {
      cliente: true,
	  cuentaporcobrar: true,
	  servicioProcesado: true
  },
  where: {
      cuentaporcobrar: {
          status: Status.ACTIVO,
        
        
      },
    status:   StatusFactura.APROBADA,
    cliente: {id: id}
    
 
  },
  });
  return facturas;
}

async getCuentasFacturasIFiltro(id: string,filtro: FiltroFechaDto): Promise<Factura[]>{

	let actualdate: Date = new Date();
  let inicio: Date = new Date(actualdate.getFullYear()+'-01-01');
  let fin: Date = new Date(actualdate.getFullYear()+'-12-31');
 
  if(filtro.start){
  inicio = filtro.start;

  }
  if(filtro.end){
  fin = filtro.end;

  }

	const facturas: Factura[] = await this.facturaRepository.find({
    relations: {
      cliente: true,
	  cuentaporcobrar: true,
	  servicioProcesado: true
  },
  where: {
     
    status:  Not(StatusFactura.CANCELADA) ,
    fechafactura: Between(inicio,fin),
    
    cliente: {id: id}
    
 
  },
  });
  return facturas;
}

 
}
