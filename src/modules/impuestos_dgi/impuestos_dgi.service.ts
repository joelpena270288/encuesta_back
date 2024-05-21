import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImpuestosDgiDto } from './dto/create-impuestos_dgi.dto';
import { UpdateImpuestosDgiDto } from './dto/update-impuestos_dgi.dto';
import { Between, Repository } from 'typeorm';
import { TipoImpuestosDgi } from '../tipo_impuestos_dgi/entities/tipo_impuestos_dgi.entity';
import { ImpuestosDgi } from './entities/impuestos_dgi.entity';
import * as moment from 'moment';
import { CuentasEmpresa } from '../cuentas-empresa/entities/cuentas-empresa.entity';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { Status } from '../../EntityStatus/entity.estatus.enum';
@Injectable()
export class ImpuestosDgiService {
  constructor(
    @Inject('TIPOIMPUESTODGI_REPOSITORY')
    private tipoImpuestoDgiRepository: Repository<TipoImpuestosDgi>,
    @Inject('CUENTAEMPRESA_REPOSITORY')
    private cuentasRepository: Repository<CuentasEmpresa>,
    @Inject('IMPUESTODGI_REPOSITORY')
    private impuestoDgiRepository: Repository<ImpuestosDgi>,
  ) {}
  async create(
    createImpuestosDgiDto: CreateImpuestosDgiDto,
  ): Promise<ImpuestosDgi> {
    const fundtipo: TipoImpuestosDgi =
      await this.tipoImpuestoDgiRepository.findOne({
        where: { id: createImpuestosDgiDto.idtipo },
      });
    if (!fundtipo) {
      throw new NotFoundException(
        'El tipo de impuesto Introducido no es valido',
      );
    }
    const foundcuenta: CuentasEmpresa = await this.cuentasRepository.findOne({
      where: { id: createImpuestosDgiDto.idcuenta },
    });
    if (!foundcuenta) {
      throw new NotFoundException('La Cuenta Introducida no es valida');
    }

    const newImpuesto: ImpuestosDgi = new ImpuestosDgi();
    newImpuesto.tipo = fundtipo;

    newImpuesto.valor = createImpuestosDgiDto.valor;

    newImpuesto.fechapago = createImpuestosDgiDto.fechapago;
    newImpuesto.documento = createImpuestosDgiDto.documento;
    newImpuesto.metododepago = createImpuestosDgiDto.metododepago;
    newImpuesto.pagodesde = createImpuestosDgiDto.pagodesde;
    newImpuesto.cuenta = foundcuenta;
    newImpuesto.periodo = createImpuestosDgiDto.periodo.replace('-', '');
    newImpuesto.comision = createImpuestosDgiDto.comision;
    newImpuesto.total =
      parseFloat(createImpuestosDgiDto.valor.toString()) +
      parseFloat(createImpuestosDgiDto.comision.toString());

    return await this.impuestoDgiRepository.save(newImpuesto);
  }

  async findAll(): Promise<ImpuestosDgi[]> {
    return await this.impuestoDgiRepository.find({
      order: {
        periodo: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<ImpuestosDgi> {
    const foundImpuesto: ImpuestosDgi =
      await this.impuestoDgiRepository.findOne({ where: { id: id } });

    if (!foundImpuesto) {
      throw new NotFoundException('No existe el impuesto DDGI introducido');
    }
    return foundImpuesto;
  }

  async update(
    id: string,
    updateImpuestosDgiDto: UpdateImpuestosDgiDto,
  ): Promise<ImpuestosDgi> {
    const foundImpuesto: ImpuestosDgi =
      await this.impuestoDgiRepository.findOne({ where: { id: id } });

    if (!foundImpuesto) {
      throw new NotFoundException('No existe el impuesto DDGI introducido');
    }
    const fundtipo: TipoImpuestosDgi =
      await this.tipoImpuestoDgiRepository.findOne({
        where: { id: updateImpuestosDgiDto.idtipo },
      });
    if (!fundtipo) {
      throw new NotFoundException(
        'El tipo de impuesto Introducido no es valido',
      );
    }
    const foundcuenta: CuentasEmpresa = await this.cuentasRepository.findOne({
      where: { id: updateImpuestosDgiDto.idcuenta },
    });
    if (!foundcuenta) {
      throw new NotFoundException('La Cuenta Introducida no es valida');
    }

    foundImpuesto.updatedAt = new Date();
    foundImpuesto.periodo = updateImpuestosDgiDto.periodo;
    foundImpuesto.tipo = fundtipo;
    foundImpuesto.valor = updateImpuestosDgiDto.valor;
    foundImpuesto.periodo = updateImpuestosDgiDto.periodo.replace('-', '');
    foundImpuesto.documento = updateImpuestosDgiDto.documento;
    foundImpuesto.metododepago = updateImpuestosDgiDto.metododepago;
    foundImpuesto.pagodesde = updateImpuestosDgiDto.pagodesde;
    foundImpuesto.cuenta = foundcuenta;
    foundImpuesto.fechapago = updateImpuestosDgiDto.fechapago;
    foundImpuesto.comision = updateImpuestosDgiDto.comision;
    foundImpuesto.total =
      parseFloat(updateImpuestosDgiDto.valor.toString()) +
      parseFloat(updateImpuestosDgiDto.comision.toString());
    return await this.impuestoDgiRepository.save(foundImpuesto);
  }

  async remove(id: string): Promise<ImpuestosDgi> {
    const foundImpuesto: ImpuestosDgi =
      await this.impuestoDgiRepository.findOne({ where: { id: id } });

    if (!foundImpuesto) {
      throw new NotFoundException('No existe el impuesto DDGI introducido');
    }
    foundImpuesto.updatedAt = new Date();
    foundImpuesto.status = Status.INACTIVO;
    return await this.impuestoDgiRepository.save(foundImpuesto);
  }

  async findAllImpuestoByFilter(
    id: string,
    filtro: FiltroFechaDto,
  ): Promise<ImpuestosDgi[]> {
    let actualdate: Date = new Date();
    let inicio: Date = new Date(actualdate.getFullYear() + '-01-01 00:00:00');
    let fin: Date = new Date(actualdate.getFullYear() + '-12-31 23:59:59');

    if (filtro.start) {
      inicio = new Date(filtro.start.toString() + ' 00:00:00') ;
    
    }
    if (filtro.end) {
      fin = new Date(filtro.end.toString() + ' 23:59:59' ) ;

    }

    return await this.impuestoDgiRepository
      .createQueryBuilder('impuesto')
      .orderBy('impuesto.createdAt', 'DESC')
      .innerJoinAndSelect('impuesto.tipo', 'tipo')
      .innerJoinAndSelect('impuesto.cuenta', 'cuenta')
      .innerJoinAndSelect(
        'tipo.entidad',
        'entidad',
        'entidad.id = :identidad',
        { identidad: id },
      )
      .where('impuesto.createdAt >= :inicio', { inicio: inicio })
      .andWhere('impuesto.createdAt <= :fin', { fin: fin })
      .andWhere('impuesto.status = :estado', { estado: Status.ACTIVO })
      .getMany();
  }
}
