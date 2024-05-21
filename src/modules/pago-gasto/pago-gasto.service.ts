import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoGastoDto } from './dto/create-pago-gasto.dto';
import { UpdatePagoGastoDto } from './dto/update-pago-gasto.dto';
import { PagoGasto } from './entities/pago-gasto.entity';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { StatusGasto } from '../gastos_empresas/entities/gasto-status.enum';
import { Not, Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { CuentasEmpresa } from '../cuentas-empresa/entities/cuentas-empresa.entity';
import { Moneda } from '../moneda/entities/moneda.entity';
import * as moment from 'moment';
@Injectable()
export class PagoGastoService {
  constructor(
    @Inject('PAGOGASTO_REPOSITORY')
    private pagoRepository: Repository<PagoGasto>,
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoempresaRepository: Repository<GastosEmpresa>,
    @Inject('CUENTAEMPRESA_REPOSITORY')
    private cuentaRepository: Repository<CuentasEmpresa>,
    @Inject('MONEDA_REPOSITORY')
    private monedaRepository: Repository<Moneda>,
  ) {}
  async create(createPagoGastoDto: CreatePagoGastoDto): Promise<GastosEmpresa> {
    const pagoGasto: PagoGasto = new PagoGasto();

    const foundGastoEmpresa: GastosEmpresa =
      await this.gastoempresaRepository.findOne({
        relations: {
          cuentaporpagar: true,
          proyecto: true,
        },
        where: {
          cuentaporpagar: {
            status: Status.ACTIVO,
          },
          id: createPagoGastoDto.idgasto,
          status: StatusGasto.ACTIVO,
        },
      });

    if (!foundGastoEmpresa) {
      throw new BadRequestException(
        'El Gasto introducido está completado o no es válido',
      );
    }

    const foundCuenta: CuentasEmpresa = await this.cuentaRepository.findOne({
      where: { id: createPagoGastoDto.idcuenta, status: Status.ACTIVO },
    });

    if (!foundCuenta) {
      throw new NotFoundException(
        'La cuenta de la Empresa introducida no es correcta o está desahabilitada',
      );
    }
    const foundMoneda: Moneda = await this.monedaRepository.findOne({
      where: { valor: foundGastoEmpresa.simbolomoneda },
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
      foundGastoEmpresa.cuentaporpagar.montorestante >
      parseFloat(createPagoGastoDto.pago.toString())
    ) {
      foundGastoEmpresa.cuentaporpagar.montorestante =
        parseFloat(foundGastoEmpresa.cuentaporpagar.montorestante.toString()) -
        parseFloat(createPagoGastoDto.pago.toString());
      foundGastoEmpresa.cuentaporpagar.updatedAt = new Date();
      pagoGasto.pago = createPagoGastoDto.pago;
    } else {
      foundGastoEmpresa.status = StatusGasto.INACTIVO;
      pagoGasto.pago = foundGastoEmpresa.cuentaporpagar.montorestante;
      foundGastoEmpresa.cuentaporpagar.montorestante = 0;
      foundGastoEmpresa.cuentaporpagar.status = StatusGasto.INACTIVO;
      foundGastoEmpresa.cuentaporpagar.updatedAt = new Date();
    }

    pagoGasto.cuenta = foundCuenta;
    pagoGasto.gastoempresa = foundGastoEmpresa;
    pagoGasto.numerocheque = createPagoGastoDto.numerocheque;
    pagoGasto.numerocTranferencia = createPagoGastoDto.numeroTransferencia;
    pagoGasto.createdAt = createPagoGastoDto.fechaBanco;
    pagoGasto.simbolomoneda = foundGastoEmpresa.simbolomoneda;
    if (foundMoneda.tasa > 1) {
      pagoGasto.monedanacional =
        parseFloat(createPagoGastoDto.pago.toString()) *
        parseFloat(foundMoneda.tasa.toString());
      
    } else {
      pagoGasto.monedanacional = createPagoGastoDto.pago;
     
    }
    const savedGastoEmpresa: GastosEmpresa =
      await this.gastoempresaRepository.save(foundGastoEmpresa);
    if (!savedGastoEmpresa) {
      throw new BadRequestException('Error al generar el pago');
    }
    const savedPago: PagoGasto = await this.pagoRepository.save(pagoGasto);

    return await this.gastoempresaRepository.findOne({
      relations: {
        cuentaporpagar: true,
        proyecto: true,
        gastosItems: true,
      },
      where: {
        id: createPagoGastoDto.idgasto,
        status: Not(StatusGasto.CANCELADO),
      },
    });
  }

  findAll() {
    return `This action returns all pagoGasto`;
  }

  findOne(id: string) {
    return `This action returns a #${id} pagoGasto`;
  }

  update(id: string, updatePagoGastoDto: UpdatePagoGastoDto) {
    return `This action updates a #${id} pagoGasto`;
  }

  async remove(id: string): Promise<PagoGasto> {
    const foundPago: PagoGasto = await this.pagoRepository.findOne({
      relations: {
        gastoempresa: true,
      },
      where: {
        id: id,
        status: Not(StatusGasto.CANCELADO),
      },
    });
    if (!foundPago) {
      throw new NotFoundException('No existe el pago Introducido');
    }

    foundPago.gastoempresa.cuentaporpagar.montorestante =
      parseFloat(
        foundPago.gastoempresa.cuentaporpagar.montorestante.toString(),
      ) + parseFloat(foundPago.pago.toString());
    foundPago.gastoempresa.status = StatusGasto.ACTIVO;
    foundPago.gastoempresa.cuentaporpagar.status = Status.ACTIVO;
    const updategasto: GastosEmpresa = await this.gastoempresaRepository.save(
      foundPago.gastoempresa,
    );
    if (!updategasto) {
      throw new BadRequestException('No se pudo cancelar el pago');
    }
    foundPago.status = Status.INACTIVO;
    return await this.pagoRepository.save(foundPago);
  }
}
