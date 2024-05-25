import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';
import { Cuestionario } from './entities/cuestionario.entity';
import { Repository } from 'typeorm';
import { Venta } from '../venta/entities/venta.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { isNotEmpty } from 'class-validator';
import { Encuesta } from '../encuesta/entities/encuesta.entity';
import { Pregunta } from '../encuesta/entities/pregunta.entity';
import { Respuesta } from './entities/respuesta.entity';
import { User } from '../users/entities/user.entity';
import { Log } from '../log/entities/log.entity';

@Injectable()

export class CuestionarioService {
  constructor(
    @Inject('ENCUESTA_REPOSITORY')
     private encuestaRepository: Repository<Encuesta>,
     @Inject('CUESTIONARIO_REPOSITORY')
     private cuestionarioRepository: Repository<Cuestionario>,
     @Inject('VENTA_REPOSITORY')
     private ventaRepository: Repository<Venta>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>
  ){}
 async create(createCuestionarioDto: CreateCuestionarioDto,user: User): Promise<Cuestionario> {
  const respuestaList: Respuesta[] = new Array<Respuesta>();
  const venta: Venta = await this.ventaRepository.findOne({where:{id: createCuestionarioDto.idVenta,status: Status.ACTIVO}}); 
  if(!venta){
    throw new NotFoundException("No se encontro la venta introducida");
  }
  const encuesta: Encuesta = await this.encuestaRepository.findOne({where:{id: createCuestionarioDto.idEncuesta, status: Status.ACTIVO}});
  if(!encuesta){
    throw new NotFoundException("La encuesta introducida no es correcta");
  }
  if(isNotEmpty(venta.cuestionarios.filter(x=>{
    x.encuesta.id = encuesta.id
  })) ){
    throw new BadRequestException("La venta ya se le hizo la encuesta");
  }
const cuestionario: Cuestionario = new Cuestionario();
let valor = 0;
for (let index = 0; index < createCuestionarioDto.respuestas.length; index++) {
  const respuesta: Respuesta = new Respuesta();
   respuesta.idpregunta =  createCuestionarioDto.respuestas[index].idpregunta;
   respuesta.respuesta = createCuestionarioDto.respuestas[index].respuesta;
 respuestaList.push(respuesta);
 const foundPregunta: Pregunta = encuesta.preguntas.filter(x=>{x.id = createCuestionarioDto.respuestas[index].idpregunta})[0];
 if(foundPregunta){

  if(foundPregunta.text === createCuestionarioDto.respuestas[index].respuesta ){
    valor+= foundPregunta.valor;
  }
 }


  const element = createCuestionarioDto.respuestas[index];
  
}
cuestionario.encuesta = encuesta;
cuestionario.venta = venta;
cuestionario.respuestas = respuestaList;
cuestionario.resultado = valor;
await this.cuestionarioRepository.save(cuestionario);

const log: Log = new Log();
log.usuario = user.username;
log.accion = 'Crear';
log.entidad = 'Cuestionario';
log.mensaje = "Creo Cuestionario:" + encuesta.name+ "a la venta del vehiculo : " + venta.vehiculo.chasis;
await this.logRepository.save(log);
return cuestionario;
  }

 async findAll(): Promise<Cuestionario[]> {
    return await this.cuestionarioRepository.find({where: {status: Status.ACTIVO}});
  }

 async findOne(id: string): Promise<Cuestionario> {
  const found: Cuestionario =  await this.cuestionarioRepository.findOne({where: {id: id}});
  if(!found){
    throw new NotFoundException("No se encontro el cuestionario introducido");
  }
    return found;
  }

 

async  remove(id: string, user: User): Promise<Cuestionario> {

    const found: Cuestionario =  await this.cuestionarioRepository.findOne({where: {id: id}});
    if(!found){
      throw new NotFoundException("No se encontro el cuestionario introducido");
    }
    const log: Log = new Log();
log.usuario = user.username;
log.accion = 'Crear';
log.entidad = 'Cuestionario';
log.mensaje = "Creo Dashabilito la encuesta:" + found.encuesta.name+ "a la venta del vehiculo : " + found.venta.vehiculo.chasis;
await this.logRepository.save(log);
  return found;
  }
}
