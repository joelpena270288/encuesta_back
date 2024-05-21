import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateConduceDto } from './dto/create-conduce.dto';
import { UpdateConduceDto } from './dto/update-conduce.dto';
import { Conduce } from './entities/conduce.entity';
import { Not, Repository } from 'typeorm';
import { StatusProyecto } from '../proyecto/status.enum';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Material } from '../material/entities/material.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Servicio } from '../servicio/entities/servicio.entity';
import { TipoConduce } from './type-conduce.enum';
import { EstatusConduce } from './status.enum';
import { ApiTooManyRequestsResponse } from '@nestjs/swagger';
import * as moment from 'moment';
import { DeleteConduceDto } from './dto/delete-conduce.dto';

@Injectable()
export class ConduceService {
  constructor(
    @Inject('CONDUCE_REPOSITORY')
    private conduceRepository: Repository<Conduce>,
    @Inject('EQUIPO_REPOSITORY')
    private equipoRepository: Repository<Equipo>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('MATERIAL_REPOSITORY')
    private materialRepository: Repository<Material>,
    @Inject('EMPLEADO_REPOSITORY')
    private empleadoRepository: Repository<Empleado>,
    @Inject('SERVICIO_REPOSITORY')
    private servicioRepository: Repository<Servicio>,
  ) {}
  async create(createConduceDto: CreateConduceDto): Promise<Conduce> {
    let foundMaterial: Material;
    const newConduce: Conduce = new Conduce();
    const condanterior: Conduce = await this.conduceRepository.createQueryBuilder('conduce')
    .addOrderBy('conduce.consecutivo','DESC')
     
    .getOne();
    if(!condanterior){
      newConduce.consecutivo = 1;
    
    }else{
      newConduce.consecutivo = condanterior.consecutivo +1;
    }

    newConduce.consecutivo = createConduceDto.numero;
    newConduce.horasreportadasequipo = createConduceDto.reportadasequipo;
    newConduce.horasreportadastrabajado = createConduceDto.reportadastrabajador;
    newConduce.cantidadConsummoCombustible =
      createConduceDto.cantidadConsummoCombustible;

    const foundEquipo: Equipo = await this.equipoRepository.findOne({
      where: { id: createConduceDto.idEquipo },
    });
    if (!foundEquipo) {
      throw new NotFoundException('El equipo no existe');
    }
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
      where: { id: createConduceDto.idProyecto },
    });
    if (!foundProyecto) {
      throw new NotFoundException('El proyecto no existe');
    }
    const foundEmpleado: Empleado = await this.empleadoRepository.findOne({
      where: { id: createConduceDto.idEmpleado },
    });
    if (!foundEmpleado) {
      throw new NotFoundException('El proyecto no existe');
    }
    const foundServicio: Servicio = await this.servicioRepository.findOne({
      where: { id: createConduceDto.idServicio },
    });
    if (createConduceDto.name === TipoConduce.CONTROLVIAJE) {
      if (createConduceDto.cantidadViaje < 1) {
        throw new BadRequestException(
          'La cantidad de viajes no puede ser menor que 1',
        );
      }
      if (createConduceDto.desde === '' || createConduceDto.hasta === '') {
        throw new BadRequestException(
          'Debe introducir punto de partida y punto de llegada',
        );
      }
      if (createConduceDto.idMaterial === '') {
        throw new BadRequestException(
          'Debe introducir un Material en el conduce',
        );
      } else {
        foundMaterial = await this.materialRepository.findOne({
          where: { id: createConduceDto.idMaterial },
        });
        if (!foundMaterial) {
          throw new BadRequestException(
            'Debe introducir un Material a transportar',
          );
        }
      }

      newConduce.name = TipoConduce.CONTROLVIAJE;
      newConduce.cantViajes = createConduceDto.cantidadViaje;
      newConduce.desde = createConduceDto.desde.toUpperCase();
      newConduce.hasta = createConduceDto.hasta.toUpperCase();
      newConduce.material = foundMaterial;
      
    } else if (createConduceDto.name === TipoConduce.TRANSPORTEEQUIPO) {
      if (createConduceDto.desde === '' || createConduceDto.hasta === '') {
        throw new BadRequestException(
          'Debe introducir punto de partida y punto de llegada',
        );
      }
      if (createConduceDto.cantidadViaje < 1) {
        throw new BadRequestException(
          'La cantidad de viajes no puede ser menor que 1',
        );
      }
      newConduce.name = TipoConduce.TRANSPORTEEQUIPO;
      newConduce.desde = createConduceDto.desde.toUpperCase();
      newConduce.hasta = createConduceDto.hasta.toUpperCase();
      newConduce.cantViajes = createConduceDto.cantidadViaje;
    } else if (createConduceDto.name === TipoConduce.CONTROLHORA) {
      newConduce.name = TipoConduce.CONTROLHORA;
    } else {
      throw new BadRequestException('Debe introducir un Modelo de Conduce');
    }

    //const desde = moment(new Date() +" " +  createConduceDto.horaInicio, "YYYY-MM-DD HH:mm:ss");
    const desde = new Date();
    desde.setHours(parseInt(createConduceDto.horaInicio.split(':')[0]));
    desde.setMinutes(parseInt(createConduceDto.horaInicio.split(':')[1]));
    //const hasta = moment(new Date() +" " + createConduceDto.horaFin, "YYYY-MM-DD HH:mm:ss");
    const hasta = new Date();
    hasta.setHours(parseInt(createConduceDto.horaFin.split(':')[0]));
    hasta.setMinutes(parseInt(createConduceDto.horaFin.split(':')[1]));
    if (desde > hasta) {
      throw new BadRequestException(
        'La hora de inicio debe ser menor que la fin',
      );
    }

    newConduce.horaFin = moment(hasta).format('HH:mm:ss');
    newConduce.horaInicio =  moment(desde).format('HH:mm:ss');
    newConduce.observaciones = createConduceDto.observaciones;
    newConduce.proyecto = foundProyecto;
    newConduce.servicio = foundServicio;
    newConduce.fecha = createConduceDto.fecha;
    newConduce.empleado = foundEmpleado;
    newConduce.equipo = foundEquipo;
    newConduce.firma_chofer = createConduceDto.firma_chofer;
    newConduce.firma_cliente = createConduceDto.firma_cliente;
    newConduce.metrosCubicos = createConduceDto.metrosCubicos;
    const momentDesde = moment(desde);
    const momentHasta = moment(hasta);
    const duration = moment.duration(momentHasta.diff(momentDesde));

    newConduce.horas = moment(
      duration.hours().toString() + ' ' + duration.minutes().toString(),
      'HH:mm',
    ).format('HH:mm');

    return await this.conduceRepository.save(newConduce);
  }

  async findAll(): Promise<Conduce[]> {
    return await this.conduceRepository.find({
      relations: {
        proyecto: true,
      },
      where: { status: Not(EstatusConduce.CANCELADO) },
    });
  }

  async findOne(id: string): Promise<Conduce> {
    return await this.conduceRepository.findOne({
      where: { id: id, status: Not(EstatusConduce.CANCELADO) },
    });
  }

  update(id: string, updateConduceDto: UpdateConduceDto) {
    return `This action updates a #${id} conduce`;
  }

  async cancel(id: string, eleteConduceDto: DeleteConduceDto): Promise<Conduce> {
    const foundConduce: Conduce = await this.conduceRepository.findOne({
      where: { id: id },
    });
    if (!foundConduce) {
      throw new NotFoundException('No existe el conduce');
    }
    foundConduce.status = EstatusConduce.CANCELADO;
    foundConduce.motivo = eleteConduceDto.motivo;
    foundConduce.updatedAt = new Date();
    return await this.conduceRepository.save(foundConduce);
  }
  async getAcarreoByIdProyecto(idProyecto: string): Promise<Conduce[]> {
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
      where: { id: idProyecto },
    });
    if (!foundProyecto) {
      throw new NotFoundException('El proyecto no existe');
    }
    return await this.conduceRepository.find({
      relations: {
        proyecto: false,
        empleado: true,
        equipo: true,
        servicio: true,
      },
      where: {
        proyecto: {
          id: idProyecto,
        },
        name: TipoConduce.TRANSPORTEEQUIPO,
        status: Not(EstatusConduce.CANCELADO),
      },
    });
  }

  async getControlHoraByIdProyecto(idProyecto: string): Promise<Conduce[]> {
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
      where: { id: idProyecto },
    });
    if (!foundProyecto) {
      throw new NotFoundException('El proyecto no existe');
    }
    return await this.conduceRepository.find({
      relations: {
        proyecto: false,
      },
      where: {
        proyecto: {
          id: idProyecto,
        },
        name: TipoConduce.CONTROLHORA,
        status: Not(EstatusConduce.CANCELADO),
      },
    });
  }
  async getControlViajeByIdProyecto(idProyecto: string): Promise<Conduce[]> {
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
      where: { id: idProyecto },
    });
    if (!foundProyecto) {
      throw new NotFoundException('El proyecto no existe');
    }
    return await this.conduceRepository.find({
      relations: {
        proyecto: false,
      },
      where: {
        proyecto: {
          id: idProyecto,
        },
        name: TipoConduce.CONTROLVIAJE,
        status: Not(EstatusConduce.CANCELADO),
      },
    });
  }
}
