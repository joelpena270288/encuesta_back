import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGastosEmpresaDto } from './dto/create-gastos_empresa.dto';
import { UpdateGastosEmpresaDto } from './dto/update-gastos_empresa.dto';
import { GastosEmpresa } from './entities/gastos_empresa.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { CuentasPorPagarEmpresa } from './entities/cuenta-por-pagar-empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Between, Not, Repository } from 'typeorm';
import { Proyecto } from '../proyecto/entities/proyecto.entity';

import { StatusProyecto } from '../proyecto/status.enum';
import { GastoItem } from '../gasto_item/entities/gasto_item.entity';
import { StatusGasto } from './entities/gasto-status.enum';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Provedor } from '../provedor/entities/provedor.entity';
import { B11 } from '../b11/entities/b11.entity';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { DescuentoGastosEmpresaDto } from './dto/descuento-gastos_empresa.dto';
import { CreateGastoItemDto } from '../gasto_item/dto/create-gasto_item.dto';
import { TipoPagoGasto } from './entities/gasto-tipo-pago.enum';
import {Moneda} from '../moneda/entities/moneda.entity';

@Injectable()
export class GastosEmpresasService {
  constructor(
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('GASTOITEM_REPOSITORY')
    private itemsRepository: Repository<GastoItem>,
    @Inject('EQUIPO_REPOSITORY')
    private equipoRepository: Repository<Equipo>,
    @Inject('PROVEDOR_REPOSITORY')
    private provedorRepository: Repository<Provedor>,
    @Inject('B11_REPOSITORY')
    private b11Repository: Repository<B11>,
    @Inject('MONEDA_REPOSITORY')
    private monedaRepository: Repository<Moneda>,
  ) {}
  async create(
    createGastosEmpresaDto: CreateGastosEmpresaDto,
  ): Promise<GastosEmpresa> {
    const foundProvedor: Provedor = await this.provedorRepository.findOne({
      where: { id: createGastosEmpresaDto.idprovedor },
    });
    if (!foundProvedor) {
      throw new NotFoundException('No existe el provedor');
    }
  const foundMoneda: Moneda = await this.monedaRepository.findOne({where:{id: createGastosEmpresaDto.idmoneda}});
  if(!foundMoneda){
    throw new NotFoundException('Debe introducir una modenda existente en el sistema');
  }
    const cuentaporpagar: CuentasPorPagarEmpresa = new CuentasPorPagarEmpresa();
    const gasto: GastosEmpresa = new GastosEmpresa();
    if (foundProvedor.informal) {
      const foundb11: B11 = await this.b11Repository
        .createQueryBuilder('b11')
        .addOrderBy('b11.valor')
        .where('b11.status = :estado', { estado: Status.ACTIVO })
        .andWhere('b11.fecha >= :fecha', { fecha: new Date() })
        .getOne();
      if (!foundb11) {
        throw new NotFoundException('No quedan consecutivos B11 disponibles ');
      }
      gasto.NCF = foundb11.valor;
      foundb11.status = Status.INACTIVO;
      const savedNcf: B11 = await this.b11Repository.save(foundb11);
      if (!savedNcf) {
        throw new BadRequestException(
          'Error al desahabilitar el consecutivo NCF',
        );
      }
    } else {
      if (createGastosEmpresaDto.NCF !== '') {
        gasto.NCF = createGastosEmpresaDto.NCF.toUpperCase();
      }
    }
    if (createGastosEmpresaDto.NCF !== '') {
      const foundGasto: GastosEmpresa = await this.gastoRepository
        .createQueryBuilder('gasto')
        .innerJoin('gasto.provedor', 'provedor')
        .where('gasto.NCF = :ncfgasto', { ncfgasto: gasto.NCF })
        .andWhere('provedor.id = :idprovedor', { idprovedor: foundProvedor.id })
        .andWhere('gasto.status = :estadogasto', { estadogasto: StatusGasto.ACTIVO})
        
        .getOne();
      if (foundGasto) {
        throw new BadRequestException(
          'Existe un gasto activo registrado a ese proveedor con el mismo NCF ',
        );
      }
    }

    gasto.provedor = foundProvedor;
    gasto.descripcion = createGastosEmpresaDto.descripcion;

    gasto.factura = createGastosEmpresaDto.factura.toUpperCase();
    gasto.cuentaporpagar = cuentaporpagar;
    gasto.tipoPago = createGastosEmpresaDto.tipopago;
    gasto.impuestoselectivoconsumo =
      createGastosEmpresaDto.impuestoselectivoconsumo;
    gasto.propina = createGastosEmpresaDto.propina;
    gasto.impuestoclaro = createGastosEmpresaDto.impuestoclaro;
    gasto.createdAt = createGastosEmpresaDto.fecha;
    gasto.tasadgii = createGastosEmpresaDto.tasadgii;
    gasto.simbolomoneda = foundMoneda.valor;
    if (createGastosEmpresaDto.idproyecto !== null) {
      const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
        where: {
          status: Not(StatusProyecto.CANCELADO),
          id: createGastosEmpresaDto.idproyecto,
        },
      });
      if (!foundProyecto) {
        throw new BadRequestException('El proyecto introducido no es valido');
      } else {
        gasto.proyecto = foundProyecto;
      }
    }

    const creategasto: GastosEmpresa = await this.gastoRepository.save(gasto);
    if (!creategasto) {
      throw new BadRequestException('Error al generar el gasto');
    }

    if (createGastosEmpresaDto.items.length < 1) {
      throw new BadRequestException(
        'No hay una lista de productos en el gasto',
      );
    }
    let valorTotal = 0;

    for (let index = 0; index < createGastosEmpresaDto.items.length; index++) {
      if (
        parseFloat(createGastosEmpresaDto.items[index].cantidad.toString()) >
          0 &&
        parseFloat(createGastosEmpresaDto.items[index].importe.toString()) > 0
      ) {
        const gasto_item: GastoItem = new GastoItem();
        gasto_item.descripcion =
          createGastosEmpresaDto.items[index].descripcion;
        gasto_item.importe = createGastosEmpresaDto.items[index].importe;
        gasto_item.importeimpuesto =
          createGastosEmpresaDto.items[index].importeimpuesto;
        gasto_item.cantidad = createGastosEmpresaDto.items[index].cantidad;
        gasto_item.valortotal =
          parseFloat(gasto_item.importe.toString()) +
          parseFloat(gasto_item.importeimpuesto.toString());
        gasto_item.gasto = creategasto;
        gasto_item.preciounitario =
          createGastosEmpresaDto.items[index].preciounitario;
        gasto_item.createdAt = createGastosEmpresaDto.fecha;
        if (createGastosEmpresaDto.items[index].idequipo !== null) {
          const foundEquipo: Equipo = await this.equipoRepository.findOne({
            where: {
              status: Not(StatusProyecto.CANCELADO),
              id: createGastosEmpresaDto.items[index].idequipo,
            },
          });
          if (!foundEquipo) {
            throw new BadRequestException('El equipo introducido no es valido');
          } else {
            gasto_item.equipo = foundEquipo;
          }
        }
        try {
          await this.itemsRepository.save(gasto_item);
        } catch (error) {
          console.log(error);
        }

        valorTotal = valorTotal + parseFloat(gasto_item.valortotal.toString());
      }
    }
    valorTotal =
      parseFloat(valorTotal.toString()) +
      (parseFloat(createGastosEmpresaDto.impuestoselectivoconsumo.toString()) +
        parseFloat(createGastosEmpresaDto.propina.toString()) +
        parseFloat(createGastosEmpresaDto.impuestoclaro.toString()));
    cuentaporpagar.montoinicial = valorTotal;
    cuentaporpagar.montorestante = valorTotal;

    creategasto.cuentaporpagar = cuentaporpagar;

    switch (createGastosEmpresaDto.metodoPago) {
      case 'COMPRA A CREDITO':
        creategasto.tipoPago = TipoPagoGasto.CREDITO;
        break;
      case 'EFECTIVO':
        creategasto.tipoPago = TipoPagoGasto.EFECTIVO;
        break;
      case 'TARJETA DE CREDITO':
        creategasto.tipoPago = TipoPagoGasto.TARJETACREDITO;
        break;
      default:
        creategasto.tipoPago = TipoPagoGasto.TRANSFERENCIA;
        break;
    }

    const savedGasto: GastosEmpresa =
      await this.gastoRepository.save(creategasto);
    if (!savedGasto) {
      throw new BadRequestException('Error al generar el gasto');
    }

    return savedGasto;
  }

  async findAll(): Promise<GastosEmpresa[]> {
    return await this.gastoRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        cuentaporpagar: true,
        proyecto: true,
        gastosItems: true,
        provedor: true,
      },

      where: {
        status: Not(StatusGasto.CANCELADO),
      },
    });
  }
  async findAllCuentasPorPagar(): Promise<GastosEmpresa[]> {
    return await this.gastoRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        cuentaporpagar: true,
        proyecto: true,
        gastosItems: true,
        provedor: true,
      },

      where: {
        status: StatusGasto.ACTIVO,
      },
    });
  }
  async findAllCuentasPorPagarByIdProvedor(
    id: string,
  ): Promise<GastosEmpresa[]> {
    return await this.gastoRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        cuentaporpagar: true,
        proyecto: true,
        gastosItems: true,
        provedor: true,
      },

      where: {
        status: StatusGasto.ACTIVO,
        provedor: { id: id },
      },
    });
  }
  async findAllGastoByFilter(
    id: string,
    filtro: FiltroFechaDto,
  ): Promise<GastosEmpresa[]> {
    let actualdate: Date = new Date();
    let inicio: Date = new Date(actualdate.getFullYear() + '-01-01');
    let fin: Date = new Date(actualdate.getFullYear() + '-12-31');

    if (filtro.start) {
      inicio = filtro.start;
    }
    if (filtro.end) {
      fin = filtro.end;
    }

    return await this.gastoRepository
    .createQueryBuilder('gasto')
    .leftJoinAndSelect('gasto.notascreditos', 'notascreditos')
    .leftJoinAndSelect('gasto.proyecto', 'proyecto')
    .leftJoinAndSelect('proyecto.cliente', 'cliente')
    
    .innerJoinAndSelect('gasto.cuentaporpagar', 'cuentaporpagar')
    .innerJoinAndSelect('gasto.provedor', 'provedor')
    .leftJoinAndSelect('gasto.pagos', 'pago', 'pago.status = :estadopago', {
      estadopago: Status.ACTIVO,
    })
    .leftJoinAndSelect('pago.cuenta', 'cuenta')
    .leftJoinAndSelect('cuenta.moneda', 'moneda')
    .leftJoinAndSelect(
      'gasto.gastosItems',
      'gastoItem',
      'gastoItem.status = :estadoitem',
      { estadoitem: Status.ACTIVO },
    )
    .leftJoinAndSelect('gastoItem.equipo', 'equipo')
    .leftJoinAndSelect('equipo.tipo', 'tipo')
    .leftJoinAndSelect('equipo.marca', 'marca')
    .where('provedor.id = :id', { id: id })
    .andWhere('gasto.createdAt >= :fechainicio',{fechainicio: inicio})
    .andWhere('gasto.createdAt <= :fechafin',{fechafin: fin})   
    .andWhere('gasto.status != :estadogasto', {
      estadogasto: StatusGasto.CANCELADO,
    })

    .getMany();



/*
    return await this.gastoRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        cuentaporpagar: true,
        proyecto: true,
        gastosItems: true,
        provedor: true,
      },

      where: {
        status: Not(StatusGasto.CANCELADO),
        createdAt: Between(inicio, fin),
        provedor: { id: id },
      },
    });*/
  }

  async findOne(id: string): Promise<GastosEmpresa> {
    return await this.gastoRepository
      .createQueryBuilder('gasto')
      .leftJoinAndSelect('gasto.notascreditos', 'notascreditos')
      .leftJoinAndSelect('gasto.proyecto', 'proyecto')
      .leftJoinAndSelect('proyecto.cliente', 'cliente')
      
      .innerJoinAndSelect('gasto.cuentaporpagar', 'cuentaporpagar')
      .innerJoinAndSelect('gasto.provedor', 'provedor')
      .leftJoinAndSelect('gasto.pagos', 'pago', 'pago.status = :estadopago', {
        estadopago: Status.ACTIVO,
      })
      .leftJoinAndSelect('pago.cuenta', 'cuenta')
      .leftJoinAndSelect('cuenta.moneda', 'moneda')
      .leftJoinAndSelect(
        'gasto.gastosItems',
        'gastoItem',
        'gastoItem.status = :estadoitem',
        { estadoitem: Status.ACTIVO },
      )
      .leftJoinAndSelect('gastoItem.equipo', 'equipo')
      .leftJoinAndSelect('equipo.tipo', 'tipo')
      .leftJoinAndSelect('equipo.marca', 'marca')
      .where('gasto.id = :id', { id: id })
      .andWhere('gasto.status != :estadogasto', {
        estadogasto: StatusGasto.CANCELADO,
      })

      .getOne();
  }

  async update(
    id: string,
    updateGastosEmpresaDto: UpdateGastosEmpresaDto,
  ): Promise<GastosEmpresa> {
    const foundgasto: GastosEmpresa = await this.gastoRepository.findOne({
      where: { id: id },
    });
    if (!foundgasto) {
      throw new NotFoundException('El gasto introducido no es valido');
    }
    switch (updateGastosEmpresaDto.metodoPago) {
      case 'COMPRA A CREDITO':
        foundgasto.tipoPago = TipoPagoGasto.CREDITO;
        break;
      case 'EFECTIVO':
        foundgasto.tipoPago = TipoPagoGasto.EFECTIVO;
        break;
      case 'TARJETA DE CREDITO':
        foundgasto.tipoPago = TipoPagoGasto.TARJETACREDITO;
        break;
      default:
        foundgasto.tipoPago = TipoPagoGasto.TRANSFERENCIA;
        break;
    }
    return await this.gastoRepository.save(foundgasto);
  }

  async remove(id: string): Promise<GastosEmpresa> {
    const foundGasto: GastosEmpresa = await this.gastoRepository
      .createQueryBuilder('gasto')
      .innerJoinAndSelect('gasto.cuentaporpagar', 'cuentaporpagar')
      .leftJoinAndSelect('gasto.pagos', 'pago', 'pago.status = :estadogasto', {
        estadogasto: Status.ACTIVO,
      })
      .where('gasto.id = :id', { id: id })
      .getOne();
    if (foundGasto.pagos.length > 0) {
      throw new BadRequestException('El gasto tiene pagos realizados');
    }
    foundGasto.status = StatusGasto.CANCELADO;

    return await this.gastoRepository.save(foundGasto);
  }
  async createDescuento(
    id: string,
    descuentoGastosEmpresaDto: DescuentoGastosEmpresaDto,
  ): Promise<GastosEmpresa> {
    const foundGasto: GastosEmpresa = await this.gastoRepository.findOne({
      relations: {
        cuentaporpagar: true,
      },
      where: { id: id, status: Not(StatusGasto.CANCELADO) },
    });
    if (!foundGasto) {
      throw new NotFoundException(
        'No existe el gasto o fue cancelado anteriormente',
      );
    }
    foundGasto.descuento = descuentoGastosEmpresaDto.descuento;
    foundGasto.valordescuentoimporte =
      descuentoGastosEmpresaDto.valordescuentoimporte;
    foundGasto.valordescuentoimpuesto =
      descuentoGastosEmpresaDto.valordescuentoimpuesto;
    foundGasto.cuentaporpagar.montorestante =
      parseFloat(foundGasto.cuentaporpagar.montorestante.toString()) -
      (parseFloat(descuentoGastosEmpresaDto.valordescuentoimporte.toString()) +
        parseFloat(
          descuentoGastosEmpresaDto.valordescuentoimpuesto.toString(),
        ));

    return await this.gastoRepository.save(foundGasto);
  }
  async deleteDescuento(id: string): Promise<GastosEmpresa> {
    const foundGasto: GastosEmpresa = await this.gastoRepository.findOne({
      relations: {
        cuentaporpagar: true,
      },
      where: { id: id, status: Not(StatusGasto.CANCELADO) },
    });
    if (!foundGasto) {
      throw new NotFoundException(
        'No existe el gasto o fue cancelado anteriormente',
      );
    }
    const valordescuentoimporte = foundGasto.valordescuentoimporte;
    const valordescuentoimpuesto = foundGasto.valordescuentoimpuesto;
    foundGasto.descuento = '';
    foundGasto.valordescuentoimporte = 0;
    foundGasto.valordescuentoimpuesto = 0;
    foundGasto.cuentaporpagar.montorestante =
      parseFloat(foundGasto.cuentaporpagar.montorestante.toString()) +
      (parseFloat(valordescuentoimpuesto.toString()) +
        parseFloat(valordescuentoimporte.toString()));
    return await this.gastoRepository.save(foundGasto);
  }
  async deleteGastosIntem(
    idgasto: string,
    idgastoItem: string,
  ): Promise<GastosEmpresa> {
    const foundGasto: GastosEmpresa = await this.gastoRepository
      .createQueryBuilder('gasto')
      .innerJoinAndSelect('gasto.cuentaporpagar', 'cuentaporpagar')
      .leftJoinAndSelect('gasto.pagos', 'pago', 'pago.status = :estadogasto', {
        estadogasto: Status.ACTIVO,
      })
      .where('gasto.id = :id', { id: idgasto })
      .getOne();
    if (!foundGasto) {
      throw new NotFoundException('El Gasto introducido no es valido');
    }
    if (foundGasto.pagos.length > 0) {
      throw new BadRequestException('El gasto tiene pagos realizados');
    }
    const foundGastoItem: GastoItem = await this.itemsRepository.findOne({
      where: { id: idgastoItem, status: Status.ACTIVO },
    });
    if (!foundGastoItem) {
      throw new NotFoundException('El producto introducido no es valido');
    }
    foundGasto.cuentaporpagar.montoinicial =
      parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) -
      parseFloat(foundGastoItem.valortotal.toString());
    foundGasto.cuentaporpagar.montorestante =
      parseFloat(foundGasto.cuentaporpagar.montorestante.toString()) -
      parseFloat(foundGastoItem.valortotal.toString());
    foundGasto.updatedAt = new Date();
    const savedGasto: GastosEmpresa =
      await this.gastoRepository.save(foundGasto);
    if (!foundGasto) {
      throw new BadRequestException('Error al eliminar el producto');
    }
    foundGastoItem.status = Status.INACTIVO;
    foundGastoItem.updatedAt = new Date();
    await this.itemsRepository.save(foundGastoItem);
    return foundGasto;
  }
  async addGastoItem(
    id: string,
    creategastoItem: CreateGastoItemDto,
  ): Promise<GastosEmpresa> {
    const foundGasto: GastosEmpresa = await this.gastoRepository

      .createQueryBuilder('gasto')
      .innerJoinAndSelect('gasto.cuentaporpagar', 'cuentaporpagar')
      .leftJoinAndSelect('gasto.pagos', 'pago', 'pago.status = :estadogasto', {
        estadogasto: Status.ACTIVO,
      })
      .where('gasto.id = :id', { id: id })
      .getOne();

    if (!foundGasto) {
      throw new NotFoundException('El Gasto introducido no es valido');
    }
    if (foundGasto.pagos.length > 0) {
      throw new BadRequestException('El gasto tiene pagos realizados');
    }
    const newGastoItem: GastoItem = new GastoItem();
    if (creategastoItem.idequipo !== '') {
      const equipo: Equipo = await this.equipoRepository.findOne({
        where: { id: creategastoItem.idequipo },
      });
      if (!equipo) {
        throw new NotFoundException('El equipo introducido no es valido');
      } else {
        newGastoItem.equipo = equipo;
      }
    }

    newGastoItem.cantidad = creategastoItem.cantidad;
    newGastoItem.descripcion = creategastoItem.descripcion;
    newGastoItem.gasto = foundGasto;
    newGastoItem.importe = creategastoItem.importe;
    newGastoItem.importeimpuesto = creategastoItem.importeimpuesto;
    newGastoItem.preciounitario = creategastoItem.preciounitario;
    newGastoItem.valortotal =
      parseFloat(newGastoItem.importe.toString()) +
      parseFloat(newGastoItem.importeimpuesto.toString());
    const savedgastoItem: GastoItem =
      await this.itemsRepository.save(newGastoItem);
    if (!savedgastoItem) {
      throw new BadRequestException('Error al guadar el servicio');
    }
    foundGasto.cuentaporpagar.montoinicial =
      parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) +
      parseFloat(savedgastoItem.valortotal.toString());
    foundGasto.cuentaporpagar.montorestante =
      parseFloat(foundGasto.cuentaporpagar.montorestante.toString()) +
      parseFloat(savedgastoItem.valortotal.toString());

    return await this.gastoRepository.save(foundGasto);
  }
}
