import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEncuestaDto } from './dto/create-encuesta.dto';
import { UpdateEncuestaDto } from './dto/update-encuesta.dto';
import { Encuesta } from './entities/encuesta.entity';
import { Log } from '../log/entities/log.entity';
import { Not, Repository } from 'typeorm';
import { Pregunta } from './entities/pregunta.entity';
import { Status} from '../../EntityStatus/entity.estatus.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EncuestaService {
 
  constructor(
    @Inject('ENCUESTA_REPOSITORY')
     private encuestaRepository: Repository<Encuesta>,
    @Inject('LOG_REPOSITORY')
    private logRepository: Repository<Log>
  ){}
 

async  create(createEncuestaDto: CreateEncuestaDto,user: User):Promise<Encuesta> {
    const preguntas: Pregunta[] = new Array<Pregunta>();
    const found: Encuesta = await this.encuestaRepository.findOne({where:{
      name: createEncuestaDto.name.toUpperCase(),
      status: Not(Status.INACTIVO)
    }});
    if(found){
      throw new ConflictException("Existe una encuesta con ese nombre");
    }
    let contPregunta = 0;
    for (let index = 0; index < createEncuestaDto.preguntas.length; index++) {
      const pregunta: Pregunta = new Pregunta();
      pregunta.text = createEncuestaDto.preguntas[index].text;
      pregunta.valor =  createEncuestaDto.preguntas[index].valor;
      contPregunta += createEncuestaDto.preguntas[index].valor;
      pregunta.respuesta =  createEncuestaDto.preguntas[index].respuesta;
      preguntas.push(pregunta);
    }
   
    const encuesta: Encuesta = new Encuesta();
    if(contPregunta!= createEncuestaDto.valor || createEncuestaDto.valor < 1){
      encuesta.status = Status.BORRADOR;
    }
    encuesta.name = createEncuestaDto.name.toUpperCase();
    encuesta.preguntas = preguntas;
    encuesta.valor = createEncuestaDto.valor;

    await this.encuestaRepository.save(encuesta);
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Crear';
    log.entidad = 'Encuesta';
    log.mensaje = "Creo Encuesta : " + encuesta.name;
    await this.logRepository.save(log);
return encuesta;
  }

 async findAll(): Promise<Encuesta[]> {
    return await this.encuestaRepository.find({where: {status: Not(Status.INACTIVO)}});
  
  }
  async findAllActivas(): Promise<Encuesta[]> {
    return await this.encuestaRepository.find({where: {status: Status.ACTIVO}});
  
  }

 async findOne(id: string): Promise<Encuesta> {
  const found: Encuesta = await this.encuestaRepository.findOne({where: {id: id}});
   if(!found){
    throw new NotFoundException('No se encontro la encuesta suministrada');
   }
   return found;
  }

 async update(id: string, updateEncuestaDto: UpdateEncuestaDto,user: User): Promise<Encuesta> {
  const found: Encuesta = await this.encuestaRepository.findOne({where: {id: id}});
  if(!found){
   throw new NotFoundException('No se encontro la encuesta suministrada');
  }
  const preguntas: Pregunta[] = new Array<Pregunta>();
  let contPregunta = 0;
  for (let index = 0; index < updateEncuestaDto.preguntas.length; index++) {
    const pregunta: Pregunta = new Pregunta();
    pregunta.text = updateEncuestaDto.preguntas[index].text;
    pregunta.valor =  updateEncuestaDto.preguntas[index].valor;
    pregunta.respuesta =  updateEncuestaDto.preguntas[index].respuesta;
    contPregunta += updateEncuestaDto.preguntas[index].valor;
    preguntas.push(pregunta);
  }

 
  if(contPregunta === updateEncuestaDto.valor && updateEncuestaDto.valor >0 ){
    found.status = Status.ACTIVO;
  }else{
    found.status = Status.BORRADOR;
  }
  found.name = updateEncuestaDto.name.toUpperCase();
  found.preguntas = preguntas;
  found.valor = updateEncuestaDto.valor;

  await this.encuestaRepository.save(found);
  const log: Log = new Log();
  log.usuario = user.username;
  log.accion = 'Editar';
  log.entidad = 'Encuesta';
  log.mensaje = "Edito la Encuesta : " + found.name;
  await this.logRepository.save(log);
return found;
  }

async  remove(id: string, user: User): Promise<Encuesta> {
    const found: Encuesta = await this.encuestaRepository.findOne({where: {id: id}});
    if(!found){
     throw new NotFoundException('No se encontro la encuesta suministrada');
    }
    found.status = Status.INACTIVO;
    found.updatedAt = new Date();
    await this.encuestaRepository.save(found);
    const log: Log = new Log();
    log.usuario = user.username;
    log.accion = 'Deshabilitar';
    log.entidad = 'Encuesta';
    log.mensaje = "Deshabilito la Encuesta : " + found.name;
    await this.logRepository.save(log);
    return found;
  }
}
