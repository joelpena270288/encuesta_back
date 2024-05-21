import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { Double, Not, Repository } from 'typeorm';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Cotizacion } from './entities/cotizacion.entity';
import { PreFactura } from '../pre-factura/entities/pre-factura.entity';
import { StatusProyecto } from '../proyecto/status.enum';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class CotizacionService {
  constructor(
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('COTIZACION_REPOSITORY')
    private cotizacionRepository: Repository<Cotizacion>,
    @Inject('PREFACTURA_REPOSITORY')
    private preFacturaRepository: Repository<PreFactura>,
  ) {}
  async create(createCotizacionDto: CreateCotizacionDto): Promise<Cotizacion> {
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
      where: {
        id: createCotizacionDto.proyectoId,
        status: Not(StatusProyecto.CANCELADO),
      },
    });
    if (!foundProyecto) {
      throw new NotFoundException('El proyecto no existe o est� aprobado');
    }
    const newcotizacion: Cotizacion = new Cotizacion();
    newcotizacion.UM = createCotizacionDto.UM;
    newcotizacion.cantidad = createCotizacionDto.cantidad;
    newcotizacion.importe =
      createCotizacionDto.cantidad * createCotizacionDto.precio;
    newcotizacion.nombreServicio = createCotizacionDto.nombreServicio;
    newcotizacion.precio = createCotizacionDto.precio;
    newcotizacion.proyecto = foundProyecto;
    newcotizacion.valorimpuesto = createCotizacionDto.valorimpuesto;
    newcotizacion.importeimpuesto =
      newcotizacion.importe * createCotizacionDto.valorimpuesto;
    newcotizacion.valortotal =
      newcotizacion.importeimpuesto + newcotizacion.importe;
    newcotizacion.subtotal =
      createCotizacionDto.precio * createCotizacionDto.cantidad;

    const savedCotizacion: Cotizacion =
      await this.cotizacionRepository.save(newcotizacion);
    if (!savedCotizacion) {
      throw new NotFoundException('Error al Insertar');
    }
    if (foundProyecto.ajuste) {
      const preFactura: PreFactura = new PreFactura();
      preFactura.UM = savedCotizacion.UM;
      preFactura.cantidad = savedCotizacion.cantidad;
      preFactura.importe = savedCotizacion.importe;
      preFactura.importeimpuesto = savedCotizacion.importeimpuesto;
      preFactura.nombreServicio = savedCotizacion.nombreServicio;
      preFactura.precio = savedCotizacion.precio;
      preFactura.proyecto = foundProyecto;
      preFactura.valorimpuesto = savedCotizacion.valorimpuesto;
      preFactura.valortotal = savedCotizacion.valortotal;
      preFactura.idCotizacion = savedCotizacion.id;
      await this.preFacturaRepository.save(preFactura);
    }

    return savedCotizacion;
  }

  findAll() {
    return `This action returns all cotizacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cotizacion`;
  }

  async update(
    id: string,
    updateCotizacionDto: UpdateCotizacionDto,
  ): Promise<Cotizacion> {
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
      where: {
        id: updateCotizacionDto.proyectoId,
        status: Not(StatusProyecto.CANCELADO),
      },
    });
    if (!foundProyecto) {
      throw new NotFoundException('El proyecto no existe');
    }
    const foundCotizacion: Cotizacion = await this.cotizacionRepository.findOne(
      { where: { id: id, status: Status.ACTIVO } },
    );
    if (!foundCotizacion) {
      throw new NotFoundException('El servicio  no existe');
    }
    const dif =
    parseFloat(updateCotizacionDto.cantidad.toString()) -
    parseFloat(foundCotizacion.cantidad.toString());
     const savedcantidad = parseFloat( foundCotizacion.cantidad.toString());
    foundCotizacion.UM = updateCotizacionDto.UM;
    foundCotizacion.cantidad = updateCotizacionDto.cantidad;
    foundCotizacion.precio = updateCotizacionDto.precio;
    foundCotizacion.nombreServicio = updateCotizacionDto.nombreServicio;
    foundCotizacion.proyecto = foundProyecto;
    foundCotizacion.importe = foundCotizacion.cantidad * foundCotizacion.precio;
    foundCotizacion.valorimpuesto = updateCotizacionDto.valorimpuesto;
    foundCotizacion.importeimpuesto =
      foundCotizacion.importe * updateCotizacionDto.valorimpuesto;
    foundCotizacion.valortotal =
      parseFloat(foundCotizacion.importeimpuesto.toString()) +
      parseFloat(foundCotizacion.importe.toString());
    foundCotizacion.subtotal =
      foundCotizacion.precio * foundCotizacion.cantidad;

    const savedCotizacion: Cotizacion =
      await this.cotizacionRepository.save(foundCotizacion);
    if (!savedCotizacion) {
      throw new NotFoundException('Error al Insertar');
    }
    if (foundProyecto.ajuste) {
      const foundPrefactura: PreFactura =
        await this.preFacturaRepository.findOne({
          where: { idCotizacion: savedCotizacion.id },
        });

      if (!foundPrefactura) {
        throw new NotFoundException('Error al Insertar');
      }

    if(dif+ parseFloat(foundPrefactura.cantidad.toString())<0){
      foundCotizacion.cantidad = savedcantidad; 
      await this.cotizacionRepository.save(foundCotizacion);
      throw new BadRequestException("La Cantidad modificada es menor que la cantidad facturada");
     
    }
      foundPrefactura.UM = savedCotizacion.UM;
      foundPrefactura.cantidad = parseFloat(foundPrefactura.cantidad.toString()) + dif;
      foundPrefactura.importe = savedCotizacion.importe;
      foundPrefactura.importeimpuesto = savedCotizacion.importeimpuesto;
      foundPrefactura.nombreServicio = savedCotizacion.nombreServicio;
      foundPrefactura.precio = savedCotizacion.precio;
      foundPrefactura.proyecto = savedCotizacion.proyecto;
      foundPrefactura.valorimpuesto = savedCotizacion.valorimpuesto;
      foundPrefactura.valortotal = savedCotizacion.valortotal;
      const savedprefactura: PreFactura =
        await this.preFacturaRepository.save(foundPrefactura);
    }

    return savedCotizacion;
  }

  async remove(id: string): Promise<Cotizacion> {
    const cotizacion: Cotizacion = await this.cotizacionRepository.findOne({
      where: { id: id, status: Not( Status.INACTIVO )},
    });
    if (!cotizacion) {
      throw new NotFoundException('El servicio  no existe');
    }
    const foundPrefactura: PreFactura = await this.preFacturaRepository.findOne(
      { where: { idCotizacion: cotizacion.id, status: Not(Status.INACTIVO ) } },
    );
    if (foundPrefactura) {
      foundPrefactura.status = Status.INACTIVO;

      await this.preFacturaRepository.delete({
        id: foundPrefactura.id,
        consecutivo: foundPrefactura.consecutivo,
      });
    }

    await this.cotizacionRepository.delete(cotizacion.id);

    return cotizacion;
  }
}
