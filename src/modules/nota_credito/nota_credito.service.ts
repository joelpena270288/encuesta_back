import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotaCreditoDto } from './dto/create-nota_credito.dto';
import { UpdateNotaCreditoDto } from './dto/update-nota_credito.dto';
import { NotaCredito } from './entities/nota_credito.entity';
import { Repository } from 'typeorm';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';

@Injectable()
export class NotaCreditoService {
  constructor(
    @Inject('NOTACREDITO_REPOSITORY')
    private notaRepository: Repository<NotaCredito>,
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
  ) {}
  async create(
    createNotaCreditoDto: CreateNotaCreditoDto,
  ): Promise<NotaCredito> {
    const foudgasto: GastosEmpresa = await this.gastoRepository.findOne({
      where: { id: createNotaCreditoDto.idgasto },
    });
    if (!foudgasto) {
      throw new NotFoundException('El gasto introducido no es valido');
    }
    const newNota: NotaCredito = new NotaCredito();
    newNota.descripcion = createNotaCreditoDto.descripcion;
    newNota.fecha = createNotaCreditoDto.fecha;
    newNota.gastoempresa = foudgasto;
    newNota.impuesto = createNotaCreditoDto.impuesto;
    newNota.importe = createNotaCreditoDto.importe;
    newNota.ncf =  createNotaCreditoDto.ncf;
    return await this.notaRepository.save(newNota);
  }

  async findOne(id: string): Promise<NotaCredito[]> {
    const foundnota: NotaCredito[] =  await this.notaRepository
      .createQueryBuilder('nota')
      .innerJoin('nota.gastoempresa', 'gastoempresa')
      .where('gastoempresa.id = :id', { id: id })
      .getMany();
     
      return foundnota;
  }

  async remove(id: string): Promise<boolean> {
    const foundNota: NotaCredito = await this.notaRepository.findOne({
      where: { id: id },
    });
    if (!foundNota) {
      throw new BadRequestException('No existe la nota introducida');
    }
    await this.notaRepository.remove(foundNota);
    
    
    return true;
  }
}
