import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRetencionDto } from './dto/create-retencion.dto';
import { UpdateRetencionDto } from './dto/update-retencion.dto';
import { Retencion } from './entities/retencion.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Repository } from 'typeorm';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { CreateRetencionGastoDto } from './dto/create-retencion-gasto.dto';
import { GastoItem } from '../gasto_item/entities/gasto_item.entity';
import { PagoGasto } from '../pago-gasto/entities/pago-gasto.entity';

import { CreateRetencionFacturaDto } from './dto/create-retencion-factura.dto';
import { Factura } from '../factura/entities/factura.entity';

@Injectable()
export class RetencionService {
  constructor(
    @Inject('RETENCION_REPOSITORY')
    private retencionRepository: Repository<Retencion>,
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
    @Inject('GASTOITEM_REPOSITORY')
    private gastoItemRepository: Repository<GastoItem>,
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
  ) {}
  async create(createRetencionDto: CreateRetencionDto): Promise<Retencion> {
    const findRetencion = await this.retencionRepository.findOne({
      where: { name: createRetencionDto.name.toUpperCase() },
    });

    if (findRetencion) {
      findRetencion.status = Status.ACTIVO;
      return await this.retencionRepository.save(findRetencion);
    }
    const retencion: Retencion = new Retencion();
    retencion.name = createRetencionDto.name.toUpperCase();
    retencion.valorimpuesto = createRetencionDto.valorimpuesto;
    retencion.valorretencion = createRetencionDto.valorretencion;
    retencion.descripcion = createRetencionDto.descripcion;
    return await this.retencionRepository.save(retencion);
  }

  async findAll(): Promise<Retencion[]> {
    return await this.retencionRepository.find({
      where: { status: Status.ACTIVO },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} retencion`;
  }

  async update(
    id: string,
    updateRetencionDto: UpdateRetencionDto,
  ): Promise<Retencion> {
    const findRetencion = await this.retencionRepository.findOne({
      where: { id: id },
    });
    if (!findRetencion) {
      throw new BadRequestException('No se encontro la Retencion suministrada');
    }
    findRetencion.name = updateRetencionDto.name.toUpperCase();
    findRetencion.valorimpuesto = updateRetencionDto.valorimpuesto;
    findRetencion.valorretencion = updateRetencionDto.valorretencion;
    findRetencion.updatedAt = new Date();
    return await this.retencionRepository.save(findRetencion);
  }

  async remove(id: string): Promise<Retencion> {
    const findRetencion = await this.retencionRepository.findOne({
      where: { id: id },
    });
    if (!findRetencion) {
      throw new BadRequestException('No se encontro la Retencion suministrada');
    }
    findRetencion.status = Status.INACTIVO;

    return await this.retencionRepository.save(findRetencion);
  }

  async adicionarRetencion(
    addRetencion: CreateRetencionGastoDto,
  ): Promise<Retencion> {
    const foundGasto: GastosEmpresa = await this.gastoRepository
      .createQueryBuilder('gasto')
      .innerJoinAndSelect('gasto.cuentaporpagar', 'cuentaporpagar')
     
      .leftJoinAndSelect('gasto.pagos', 'pago', 'pago.status = :estadopago', {
        estadopago: Status.ACTIVO,
      })
      .where('gasto.id = :idgasto', {
        idgasto: addRetencion.idGasto,
      })

      .getOne();

    if (!foundGasto) {
      throw new NotFoundException('El gasto Introducido No es valido');
    }
    const foundRetencion: Retencion = await this.retencionRepository.findOne({
      where: { id: addRetencion.idRetencion },
    });
    if (!foundRetencion) {
      throw new NotFoundException('La Retencion introducida no es valida');
    }
    const founGastosItem: GastoItem[] = await this.gastoItemRepository
    .createQueryBuilder('gastoitem')
    .innerJoinAndSelect('gastoitem.gasto', 'gasto','gasto.id = :idgasto',{idgasto: foundGasto.id})   
    
    .where('gastoitem.status = :status', {
      status: Status.ACTIVO,
    })
    .getMany();
    if(founGastosItem.length<1){
      throw new BadRequestException("El gasto no tiene servicios asociados");
    }
    let valortotal = 0;
    let pagosrealizados = 0;
    for (let index = 0; index <founGastosItem.length; index++) {
      valortotal =
        parseFloat(valortotal.toString()) +
        parseFloat(founGastosItem[index].importe.toString());
    }
    valortotal =
      parseFloat(valortotal.toString()) *
      parseFloat(foundRetencion.valorimpuesto.toString());
    valortotal =
      parseFloat(valortotal.toString()) *
      parseFloat(foundRetencion.valorretencion.toString());

    for (let index = 0; index < foundGasto.pagos.length; index++) {
      pagosrealizados = parseFloat(foundGasto.pagos[index].pago.toString());
    }

    foundGasto.cuentaporpagar.montoinicial =
      parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) -
      parseFloat(valortotal.toString());

    foundGasto.cuentaporpagar.montorestante =
      parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) -
      parseFloat(pagosrealizados.toString());

    foundGasto.retencion = foundRetencion.name;
    foundGasto.valorretencion = valortotal;

    const savedGasto: GastosEmpresa =
      await this.gastoRepository.save(foundGasto);
    if (!savedGasto) {
      throw new BadRequestException('Error al actualizar el gasto');
    }

    return foundRetencion;
  }

  async EliminarRetencion(id: string): Promise<String> {
    const foundGasto: GastosEmpresa = await this.gastoRepository.findOne({
      relations: {
        cuentaporpagar: true,
      },
      where: {
        id: id,
      },
    });
    if (!foundGasto) {
      throw new BadRequestException('El gasto introducido no es valido');
    }
    const result = foundGasto.retencion;
    foundGasto.cuentaporpagar.montoinicial =
      parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) +
      parseFloat(foundGasto.valorretencion.toString());
    foundGasto.cuentaporpagar.montorestante =
      parseFloat(foundGasto.cuentaporpagar.montorestante.toString()) +
      parseFloat(foundGasto.valorretencion.toString());
    foundGasto.valorretencion = 0;
    foundGasto.retencion = '';
    const savedGasto: GastosEmpresa =
      await this.gastoRepository.save(foundGasto);
    if (!savedGasto) {
      throw new BadRequestException('Error al eliminar la retencion del gasto');
    }
    return result;
  }

  async adicionarRetencionFactura(
    addRetencion: CreateRetencionFacturaDto,
  ): Promise<Retencion> {
    const foundFactura: Factura = await this.facturaRepository
      .createQueryBuilder('factura')
      .innerJoinAndSelect('factura.cuentaporcobrar', 'cuentaporcobrar')
      .leftJoinAndSelect(
        'factura.servicioProcesado',

        'servicio',
      )
      .leftJoinAndSelect('factura.pagos', 'pago', 'pago.status = :estadopago', {
        estadopago: Status.ACTIVO,
      })
      .where('factura.id = :idfactura', {
        idfactura: addRetencion.idFactura,
      })

      .getOne();

    if (!foundFactura) {
      throw new NotFoundException('La factura introducida No es valido');
    }
    const foundRetencion: Retencion = await this.retencionRepository.findOne({
      where: { id: addRetencion.idRetencion },
    });
    if (!foundRetencion) {
      throw new NotFoundException('La Retencion introducida no es valida');
    }
    let valortotal = 0;
    let pagosrealizados = 0;
    for (
      let index = 0;
      index < foundFactura.servicioProcesado.length;
      index++
    ) {
      valortotal =
        parseFloat(valortotal.toString()) +
        parseFloat(foundFactura.servicioProcesado[index].importe.toString());
    }
    valortotal =
      parseFloat(valortotal.toString()) *
      parseFloat(foundRetencion.valorimpuesto.toString());
    valortotal =
      parseFloat(valortotal.toString()) *
      parseFloat(foundRetencion.valorretencion.toString());

    for (let index = 0; index < foundFactura.pagos.length; index++) {
      pagosrealizados = parseFloat(foundFactura.pagos[index].pago.toString());
    }

    // foundFactura.cuentaporcobrar.montoinicial = parseFloat(foundFactura.cuentaporcobrar.montoinicial.toString()) - parseFloat(valortotal.toString());

    foundFactura.cuentaporcobrar.montorestante =
      parseFloat(foundFactura.cuentaporcobrar.montoinicial.toString()) -
      parseFloat(pagosrealizados.toString());

    foundFactura.retencion = foundRetencion.name;
    foundFactura.valorretencion = valortotal;

    const savedFactura: Factura =
      await this.facturaRepository.save(foundFactura);
    if (!savedFactura) {
      throw new BadRequestException('Error al actualizar la Factura');
    }

    return foundRetencion;
  }
  async EliminarRetencionFactura(id: string): Promise<String> {
    const foundFactura: Factura = await this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
      },
      where: {
        id: id,
      },
    });
    if (!foundFactura) {
      throw new BadRequestException('La factura introducida no es valido');
    }
    const result = foundFactura.retencion;
    // foundFactura.cuentaporcobrar.montoinicial = parseFloat(foundFactura.cuentaporcobrar.montoinicial.toString()) + parseFloat(foundFactura.valorretencion.toString());
    foundFactura.cuentaporcobrar.montorestante =
      parseFloat(foundFactura.cuentaporcobrar.montorestante.toString()) +
      parseFloat(foundFactura.valorretencion.toString());
    foundFactura.valorretencion = 0;
    foundFactura.retencion = '';
    const savedFactura: Factura =
      await this.facturaRepository.save(foundFactura);
    if (!savedFactura) {
      throw new BadRequestException(
        'Error al eliminar la retencion de la factura',
      );
    }
    return result;
  }
}
