import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoFacturaDto } from './dto/create-pago-factura.dto';
import { UpdatePagoFacturaDto } from './dto/update-pago-factura.dto';
import { Not, Repository } from 'typeorm';
import { PagoFactura } from './entities/pago-factura.entity';
import { Factura } from '../factura/entities/factura.entity';
import { CuentasEmpresa } from '../cuentas-empresa/entities/cuentas-empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { StatusFactura } from '../factura/entities/fatura-status.enum';

import { PagoAnticipado } from '../pago-anticipados/entities/pago-anticipado.entity';
import { CreatePagoFacturaAnticipoDto } from './dto/create-pago-factura-anticipo.dto';
import { Cliente } from '../cliente/entities/cliente.entity';
import { PagoOrigen } from './entities/pago-origen.enum';
import * as moment from 'moment';
import { Moneda } from '../moneda/entities/moneda.entity';
@Injectable()
export class PagoFacturaService {
  constructor(
    @Inject('PAGOFACTURA_REPOSITORY')
    private pagoRepository: Repository<PagoFactura>,
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
    @Inject('CUENTAEMPRESA_REPOSITORY')
    private cuentaRepository: Repository<CuentasEmpresa>,
    @Inject('PAGOANTICIPADO_REPOSITORY')
    private pagoAnticipadoRepository: Repository<PagoAnticipado>,
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
    @Inject('MONEDA_REPOSITORY')
    private monedaRepository: Repository<Moneda>,
  ) {}
  async create(createPagoFacturaDto: CreatePagoFacturaDto): Promise<Factura> {
    const newPagoAnticipado: PagoAnticipado = new PagoAnticipado();
    const pagoFactura: PagoFactura = new PagoFactura();

    const foundFactura: Factura = await this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
        cliente: true,
      },
      where: {
        cuentaporcobrar: {
          status: Status.ACTIVO,
        },
        id: createPagoFacturaDto.idfactura,
        status: StatusFactura.APROBADA,
      },
    });

    if (!foundFactura) {
      throw new BadRequestException(
        'La Factura introducida está completada o no es válida',
      );
    }
    const updateCredito : Cliente = await this.clienteRepository.findOne({where:{id: foundFactura.cliente.id }});
    const foundCuenta: CuentasEmpresa = await this.cuentaRepository.findOne({
      where: { id: createPagoFacturaDto.idcuenta, status: Status.ACTIVO },
    });

    if (!foundCuenta) {
      throw new NotFoundException(
        'La cuenta de la Empresa introducida no es correcta o está desahabilitada',
      );
    }
    const foundMoneda: Moneda = await this.monedaRepository.findOne({
      where: { valor: foundFactura.simbolomoneda },
    });
    if (!foundMoneda) {
      throw new NotFoundException(
        'La moneda introducida no esta registrada en el sistema',
      );
    }
    if (foundMoneda.tasa > 1) {
      if (
        moment(foundMoneda.updatedAt).format('YYYY-MM-DD') <
        moment(new Date()).format('YYYY-MM-DD')
      ) {
        throw new BadRequestException('Debe actualizar la tasa del dia');
      }
    }

    if (
      foundFactura.cuentaporcobrar.montorestante >
      parseFloat(createPagoFacturaDto.pago.toString())
    ) {
      foundFactura.cuentaporcobrar.montorestante =
        parseFloat(foundFactura.cuentaporcobrar.montorestante.toString()) -
        parseFloat(createPagoFacturaDto.pago.toString());
      foundFactura.cuentaporcobrar.updatedAt = new Date();
      pagoFactura.pago = createPagoFacturaDto.pago;
    } else {
      const dif =
        parseFloat(createPagoFacturaDto.pago.toString()) -
        parseFloat(foundFactura.cuentaporcobrar.montorestante.toString());

      foundFactura.status = StatusFactura.COMPLETADA;
      pagoFactura.pago = foundFactura.cuentaporcobrar.montorestante;
      foundFactura.cuentaporcobrar.montorestante = 0;
      foundFactura.cuentaporcobrar.status = Status.INACTIVO;
      foundFactura.cuentaporcobrar.updatedAt = new Date();
      newPagoAnticipado.pago = dif;
      newPagoAnticipado.cliente = foundFactura.cliente;
      newPagoAnticipado.numerocheque = createPagoFacturaDto.numerocheque;
      newPagoAnticipado.fechaBanco = new Date(createPagoFacturaDto.fechaBanco);
      newPagoAnticipado.cuenta = foundCuenta;
      pagoFactura.pagoanticipado = newPagoAnticipado;      
      updateCredito.credito.monto = (parseFloat(updateCredito.credito.monto.toString() ) + parseFloat(newPagoAnticipado.pago.toString()))*parseFloat(foundMoneda.tasa.toString()) ; 
      updateCredito.credito.updatedAt = new Date();
      
    }

    pagoFactura.cuenta = foundCuenta;
    pagoFactura.factura = foundFactura;
    pagoFactura.origen = PagoOrigen.NORMAL;
    pagoFactura.fechaBanco = new Date(createPagoFacturaDto.fechaBanco) ;
    pagoFactura.numerocheque = createPagoFacturaDto.numerocheque;
    pagoFactura.numeroTransferencia = createPagoFacturaDto.numeroTransferencia;
    pagoFactura.simbolomoneda = foundFactura.simbolomoneda;
    if (foundMoneda.tasa > 1) {
      pagoFactura.monedanacional =
        parseFloat(createPagoFacturaDto.pago.toString()) *
        parseFloat(foundMoneda.tasa.toString());
      
    } else {
      pagoFactura.monedanacional = createPagoFacturaDto.pago;
     
    }
  const savedCredito: Cliente = await this.clienteRepository.save(updateCredito);
  if(!savedCredito){
    throw new BadRequestException('Error al generar el pago');
  }
    const savedFactura: Factura =
      await this.facturaRepository.save(foundFactura);
    if (!savedFactura) {
      throw new BadRequestException('Error al generar el pago');
    }
    const savedPago: PagoFactura = await this.pagoRepository.save(pagoFactura);

    return await this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
        cliente: true,
        pagos: true,
      },
      where: {
        id: createPagoFacturaDto.idfactura,
        status: Not(StatusFactura.CANCELADA),
      },
    });
  }

  async createWithAnticipo(createPagoFacturaAnticipoDto: CreatePagoFacturaAnticipoDto): Promise<Factura> {
    const foundPagoAnticipo: PagoAnticipado = await this.pagoAnticipadoRepository.findOne({where:{id: createPagoFacturaAnticipoDto.idpagoAnticipo,status: Status.ACTIVO}});
    if(!foundPagoAnticipo){
      throw new NotFoundException("El pago introdicido no es valido");
    }
    const newPagoAnticipado: PagoAnticipado = new PagoAnticipado();
    const pagoFactura: PagoFactura = new PagoFactura();

    const foundFactura: Factura = await this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
        cliente: true,
      },
      where: {
        cuentaporcobrar: {
          status: Status.ACTIVO,
        },
        id: createPagoFacturaAnticipoDto.idfactura,
        status: StatusFactura.APROBADA,
      },
    });

    if (!foundFactura) {
      throw new BadRequestException(
        'La Factura introducida está completada o no es válida',
      );
    }
    const updateCredito : Cliente = await this.clienteRepository.findOne({where:{id: foundFactura.cliente.id }});
    const foundCuenta: CuentasEmpresa = await this.cuentaRepository.findOne({
      where: { id: foundPagoAnticipo.cuenta.id, status: Status.ACTIVO },
    });

    if (!foundCuenta) {
      throw new NotFoundException(
        'La cuenta de la Empresa introducida no es correcta o está desahabilitada',
      );
    }

    const foundMoneda: Moneda = await this.monedaRepository.findOne({
      where: { valor: foundFactura.simbolomoneda },
    });
    if (!foundMoneda) {
      throw new NotFoundException(
        'La moneda introducida no esta registrada en el sistema',
      );
    }
    if (foundMoneda.tasa > 1) {
      if (
        moment(foundMoneda.updatedAt).format('YYYY-MM-DD') <
        moment(new Date()).format('YYYY-MM-DD')
      ) {
        throw new BadRequestException('Debe actualizar la tasa del dia');
      }
    }

    if (
      foundFactura.cuentaporcobrar.montorestante >
      parseFloat(foundPagoAnticipo.pago.toString())/ parseFloat(foundMoneda.tasa.toString())
    ) {
      foundFactura.cuentaporcobrar.montorestante =
        parseFloat(foundFactura.cuentaporcobrar.montorestante.toString()) -
       ( parseFloat(foundPagoAnticipo.pago.toString())/ parseFloat(foundMoneda.tasa.toString()));
      foundFactura.cuentaporcobrar.updatedAt = new Date();
      pagoFactura.pago = parseFloat(foundPagoAnticipo.pago.toString()) / parseFloat(foundMoneda.tasa.toString());
    } else {
      const dif =
        (parseFloat(foundPagoAnticipo.pago.toString())/ parseFloat(foundMoneda.tasa.toString())) -
        parseFloat(foundFactura.cuentaporcobrar.montorestante.toString());

      foundFactura.status = StatusFactura.COMPLETADA;
      pagoFactura.pago = foundFactura.cuentaporcobrar.montorestante;
      foundFactura.cuentaporcobrar.montorestante = 0;
      foundFactura.cuentaporcobrar.status = Status.INACTIVO;
      foundFactura.cuentaporcobrar.updatedAt = new Date();
      newPagoAnticipado.pago = dif;
      newPagoAnticipado.cliente = foundFactura.cliente;
      newPagoAnticipado.numerocheque = foundPagoAnticipo.numerocheque;
      newPagoAnticipado.numeroTransferencia = foundPagoAnticipo.numeroTransferencia;
      newPagoAnticipado.cuenta = foundPagoAnticipo.cuenta;
      newPagoAnticipado.fechaBanco = foundPagoAnticipo.fechaBanco;
      
      pagoFactura.pagoanticipado = newPagoAnticipado;
      updateCredito.credito.monto = parseFloat(updateCredito.credito.monto.toString() ) + (parseFloat(newPagoAnticipado.pago.toString())*parseFloat(foundMoneda.tasa.toString())); 
     
    }

    pagoFactura.cuenta = foundCuenta;
    pagoFactura.factura = foundFactura;
    pagoFactura.numerocheque = foundPagoAnticipo.numerocheque;
    pagoFactura.origen = PagoOrigen.ANTICIPO;
    pagoFactura.fechaBanco =  foundPagoAnticipo.fechaBanco;
    pagoFactura.simbolomoneda = foundFactura.simbolomoneda;
      pagoFactura.monedanacional =
        parseFloat(foundPagoAnticipo.pago.toString());
      
      
    
    foundPagoAnticipo.status = Status.INACTIVO;
    foundPagoAnticipo.updatedAt = new Date();
    await this.pagoAnticipadoRepository.save(foundPagoAnticipo);

    updateCredito.credito.monto = parseFloat(updateCredito.credito.monto.toString() ) - parseFloat(foundPagoAnticipo.pago.toString()); 
    foundFactura.cliente.credito.updatedAt = new Date();
    const savedCredito: Cliente = await this.clienteRepository.save(updateCredito);
    if(!savedCredito){
      throw new BadRequestException('Error al generar el pago');
    }
    const savedFactura: Factura =
      await this.facturaRepository.save(foundFactura);
    if (!savedFactura) {
      throw new BadRequestException('Error al generar el pago');
    }
    const savedPago: PagoFactura = await this.pagoRepository.save(pagoFactura);

    return await this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
        cliente: true,
        pagos: true,
      },
      where: {
        id: createPagoFacturaAnticipoDto.idfactura,
        status: Not(StatusFactura.CANCELADA),
      },
    });
  }



  async pagos(idfactura: string): Promise<Factura> {
    return await this.facturaRepository
      .createQueryBuilder('factura')
      .innerJoinAndSelect('factura.cliente', 'cliente')
      
      .leftJoinAndSelect('cliente.pagosanticipados', 'pagoanticipado','pagoanticipado.status = :statuspago',{statuspago: Status.ACTIVO})
      .leftJoinAndSelect('pagoanticipado.cuenta', 'cuentaanticipo')
      .innerJoinAndSelect('cliente.credito', 'credito')  
      .innerJoinAndSelect('factura.cuentaporcobrar', 'cuentaporcobrar')
      .leftJoinAndSelect('factura.pagos', 'pago','pago.status = :estadopago', { estadopago: Status.ACTIVO })
      .leftJoinAndSelect('pago.cuenta', 'cuenta')
      .leftJoinAndSelect('cuenta.moneda', 'moneda')

      .where('factura.id = :id', { id: idfactura })
     .andWhere('factura.status != :estadofactura', {
       estadofactura: StatusFactura.CANCELADA,
      })
      .getOne();
   
  }

  findAll() {
    return `This action returns all pagoFactura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagoFactura`;
  }

  update(id: number, updatePagoFacturaDto: UpdatePagoFacturaDto) {
    return `This action updates a #${id} pagoFactura`;
  }

  async remove(id: string): Promise<PagoFactura> {
    const foundPago: PagoFactura = await this.pagoRepository.findOne({
      relations: {
        factura: true,
      },
      where: {
        id: id,
        status: Not(Status.INACTIVO),
      },
    });

    if (!foundPago) {
      throw new NotFoundException('No existe el pago Introducido');
    }
    foundPago.factura.status = StatusFactura.APROBADA;
    foundPago.factura.cuentaporcobrar.montorestante =
      parseFloat(foundPago.factura.cuentaporcobrar.montorestante.toString()) +
      parseFloat(foundPago.pago.toString());
    foundPago.factura.cuentaporcobrar.status = Status.ACTIVO;
    const updateFactura: Factura = await this.facturaRepository.save(
      foundPago.factura,
    );
    if (!updateFactura) {
      throw new BadRequestException('Error al cancelar el pago');
    }
    foundPago.status = Status.INACTIVO;
    if(foundPago.origen === PagoOrigen.ANTICIPO){
      const updateCredito : Cliente = await this.clienteRepository.findOne({where:{id:  foundPago.factura.cliente.id }});
      const newPagoAnticipo: PagoAnticipado = new PagoAnticipado();
      newPagoAnticipo.cliente = foundPago.factura.cliente;
      newPagoAnticipo.cuenta = foundPago.cuenta;
      newPagoAnticipo.numeroTransferencia = foundPago.numeroTransferencia;
      newPagoAnticipo.numerocheque = foundPago.numerocheque;
      newPagoAnticipo.pago = foundPago.pago;
      newPagoAnticipo.status = Status.ACTIVO;
      await this.pagoAnticipadoRepository.save(newPagoAnticipo);
      updateCredito.credito.monto = parseFloat(updateCredito.credito.monto.toString()) + parseFloat(newPagoAnticipo.pago.toString());
      updateCredito.credito.updatedAt = new Date();
      const savedCredito: Cliente = await this.clienteRepository.save(updateCredito);
       
    }

    return await this.pagoRepository.save(foundPago);
  }
}
