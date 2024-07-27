import { BadRequestException, Inject, Injectable, NotFoundException, ParseBoolPipe } from '@nestjs/common';
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
import { ParamResultDto } from './dto/params-result.dto';
import { ReadResultDto } from './dto/read-result.dto';
import { ResultPreguntaDto } from './dto/result-pregunta.dto';

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
  const preguntasList: Pregunta[] = encuesta.preguntas;
  const foundEncuestasrealizadas = venta.cuestionarios.find(x=>
    x.encuesta.id = encuesta.id
  );
  if(foundEncuestasrealizadas !=null){
    throw new BadRequestException("La venta ya se le hizo la encuesta");
  }
const cuestionario: Cuestionario = new Cuestionario();
let valor = 0;
for (let index = 0; index < createCuestionarioDto.respuestas.length; index++) {
  const respuesta: Respuesta = new Respuesta();

   respuesta.idpregunta =  createCuestionarioDto.respuestas[index].idpregunta;
   respuesta.respuesta = createCuestionarioDto.respuestas[index].respuesta;
 respuestaList.push(respuesta);
 

 preguntasList.forEach((item)=>{
if(item.id === respuesta.idpregunta && item.respuesta.toString() === respuesta.respuesta.toString()){
          valor += item.valor;
}

  });
 
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
log.accion = 'Eliminar';
log.entidad = 'Cuestionario';
log.mensaje = "Creo Dashabilito la encuesta:" + found.encuesta.name+ "a la venta del vehiculo : " + found.venta.vehiculo.chasis;
await this.logRepository.save(log);
  return found;
  }
  async findResult(param: ParamResultDto): Promise<ReadResultDto>{
    const readResultDto: ReadResultDto = new ReadResultDto();
    readResultDto.result = [];
    const cuestionario: Cuestionario = await this.cuestionarioRepository
      .createQueryBuilder('cuestionario')
      .innerJoinAndSelect('cuestionario.venta', 'venta','venta.id = :idVenta',{idVenta: param.idVenta})
      .innerJoinAndSelect('cuestionario.encuesta', 'encuesta', 'encuesta.id = :idEncuesta',{idEncuesta: param.idEncuesta})
      .innerJoinAndSelect('encuesta.preguntas', 'preguntas')      
      .innerJoinAndSelect('cuestionario.respuestas', 'respuestas')     
      .getOne();

       cuestionario.encuesta.preguntas.forEach((element)=>{
      
        const result: ResultPreguntaDto = new ResultPreguntaDto();
        result.enunciado = element.text;
        result.respuestaEsperada = element.respuesta;
        result.valor = element.valor;
        result.respuesta = cuestionario.respuestas.find(x=>x.idpregunta === element.id).respuesta;
         
         readResultDto.result.push(result);


       })

     return readResultDto;
  }
}
