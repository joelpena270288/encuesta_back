import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import {FiltroFechaDto} from './dto/filtro-fecha.dto'
import { Pieza } from '../piezas/entities/pieza.entity';

@Injectable()
export class InventarioService {
  constructor(
    @Inject('INVENTARIO_REPOSITORY')
    private inventarioRepository: Repository<Inventario>,
    @Inject('EQUIPO_REPOSITORY')
    private equipoRepository: Repository<Equipo>,
    @Inject('PIEZA_REPOSITORY')
    private piezaRepository: Repository<Pieza>,
  ) {}
 async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
   const foundEquipo: Equipo = await this.equipoRepository.findOne({where:{id: createInventarioDto.idequipo}})
  if(!foundEquipo){
    throw new NotFoundException('El equipo no es valido');

  }
  const foundPieza: Pieza = await this.piezaRepository.findOne({where:{serie: createInventarioDto.serie}});
 if(!foundPieza){
  throw new NotFoundException('El numero de serie de la pieza no existe');
 }
 foundPieza.cantidad = parseFloat(foundPieza.cantidad.toString()) - parseFloat(createInventarioDto.cantidad.toString());
 const savedPieza: Pieza = await this.piezaRepository.save(foundPieza); 
 if(!savedPieza){
  throw new BadRequestException("No se pudo revajar del almacen");
 }
 const inventario: Inventario = new Inventario();
 inventario.cantidad = createInventarioDto.cantidad;
 inventario.descripcion = createInventarioDto.descripcion;
 inventario.equipo = foundEquipo;
 inventario.nombre = createInventarioDto.nombre;
 inventario.serie = createInventarioDto.serie;
 inventario.precioUnitario = createInventarioDto.precioUnitario;
 inventario.valor = parseFloat(inventario.precioUnitario.toString()) * parseFloat(inventario.cantidad.toString());
return await this.inventarioRepository.save(inventario);

  }

  findAll() {
    return `This action returns all inventario`;
  }

 async findOne(id: string, filtroFechaDto: FiltroFechaDto):Promise<Inventario[]> {
   
    const inventarios: Inventario[] = await this.inventarioRepository
      .createQueryBuilder('inventario')
      .innerJoinAndSelect(
        'inventario.equipo',

        'equipo',
        'equipo.id = :idequipo',
        { idequipo: id },
      )
     
      .where('inventario.createdAt >= :start', {
        start: filtroFechaDto.start + ' 00:00:00',
      })
      .andWhere('inventario.createdAt  <= :end', {
        end: filtroFechaDto.end + ' 23:59:00',
      })
    
      .getMany();

   return inventarios;
  }

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return `This action updates a #${id} inventario`;
  }

 async remove(id: string): Promise<Inventario> {
   const founInventario: Inventario = await this.inventarioRepository.findOne({where: {id: id}});
   if(!founInventario){
    throw new NotFoundException("No existe el inventario");
   }
    return this.inventarioRepository.remove(founInventario);
  }
}
