import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntradaCombustibleDto } from './dto/create-entrada-combustible.dto';
import { UpdateEntradaCombustibleDto } from './dto/update-entrada-combustible.dto';
import { EntradaCombustible } from './entities/entrada-combustible.entity';
import { Repository } from 'typeorm';
import { Combustible } from '../combustible/entities/combustible.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Provedor } from '../provedor/entities/provedor.entity';

@Injectable()
export class EntradaCombustibleService {
  constructor(
    @Inject('COMBUSTIBLE_REPOSITORY')
    private combustibleRepository: Repository<Combustible>,
    @Inject('ENTRADACOMBUSTIBLE_REPOSITORY')
    private entradaCombustibleRepository: Repository<EntradaCombustible>,
    @Inject('PROVEDOR_REPOSITORY')
    private provedorRepository: Repository<Provedor>,
  ) {}
  async create(
    createEntradaCombustibleDto: CreateEntradaCombustibleDto,
  ): Promise<EntradaCombustible> {
    const foundCombustible: Combustible =
      await this.combustibleRepository.findOne({
        where: {
          id: createEntradaCombustibleDto.idcombustible
         
        }
      });
    if (!foundCombustible) {
      throw new BadRequestException(
        'El combustible intrododucido no es valido',
      );
    }
    const foundProvedor: Provedor = await this.provedorRepository.findOne({where:{id: createEntradaCombustibleDto.idprovedor}});
    if(!foundProvedor){
      throw new NotFoundException("El provedor introducido no es valido");
    }
    const newEntrada: EntradaCombustible = new EntradaCombustible();
    newEntrada.NCF =  'B'+ createEntradaCombustibleDto.NCF;   
    newEntrada.provedor = foundProvedor;
    newEntrada.combustible = foundCombustible;   
    newEntrada.factura = createEntradaCombustibleDto.factura;
    newEntrada.fecha = createEntradaCombustibleDto.fecha;
    newEntrada.galones = createEntradaCombustibleDto.galones;
    newEntrada.importe = createEntradaCombustibleDto.importe;
    newEntrada.importeimpuesto = createEntradaCombustibleDto.importeimpuesto;
    newEntrada.status = Status.ACTIVO;
    newEntrada.valortotal =
      parseFloat(newEntrada.importe.toString()) +
      parseFloat(newEntrada.importeimpuesto.toString());

    const savedEntrada: EntradaCombustible =
      await this.entradaCombustibleRepository.save(newEntrada);
    if (!savedEntrada) {
      throw new BadRequestException('Error al crear la entrada de combustible');
    }
    foundCombustible.capacidadTanque.capacidad =
      parseFloat(foundCombustible.capacidadTanque.capacidad.toString()) +
      parseFloat(createEntradaCombustibleDto.galones.toString());
    foundCombustible.capacidadTanque.updatedAt = new Date();
    await this.combustibleRepository.save(foundCombustible);
    return savedEntrada;
  }

  async findAll(): Promise<EntradaCombustible[]> {
    return await await this.entradaCombustibleRepository.createQueryBuilder('entrada')
    .innerJoinAndSelect('entrada.combustible','combustible')
    .innerJoinAndSelect('entrada.provedor','provedor')
    .where('entrada.status = :status',{status: Status.ACTIVO})
    .getMany();
  }

  async findOne(id: string): Promise<EntradaCombustible> {
    return await this.entradaCombustibleRepository.createQueryBuilder('entrada')
    .innerJoinAndSelect('entrada.combustible','combustible')
    .innerJoinAndSelect('entrada.provedor','provedor')
    .getOne();
  }

  update(id: number, updateEntradaCombustibleDto: UpdateEntradaCombustibleDto) {
    return `This action updates a #${id} entradaCombustible`;
  }

  async remove(id: string): Promise<EntradaCombustible> {
    const foundentrada =  await this.entradaCombustibleRepository.createQueryBuilder('entrada')
    .innerJoinAndSelect('entrada.combustible','combustible')
    .where('entrada.id = :id', {id: id})
    .getOne();
    if (!foundentrada) {
      throw new BadRequestException(
        'La Entrada de combustible intrododucida no es valida',
      );
    }
    foundentrada.status = Status.INACTIVO;
    const foundCombustible: Combustible =
      await this.combustibleRepository.findOne({
        where: { id: foundentrada.combustible.id },
      });
    foundCombustible.capacidadTanque.capacidad =
      parseFloat(foundCombustible.capacidadTanque.capacidad.toString()) -
      parseFloat(foundentrada.galones.toString());
      foundCombustible.capacidadTanque.updatedAt = new Date();
    await this.combustibleRepository.save(foundCombustible);

    return await this.entradaCombustibleRepository.save(foundentrada);
  }
}
