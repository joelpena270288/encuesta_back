import { IsString, IsInt, IsDate } from 'class-validator';
import { Servicio } from '../../servicio/entities/servicio.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';

import { Exclude, Expose,Type } from 'class-transformer';
Exclude();
export class ReadConduceDTO{
@Expose()    
@IsString()
name: string;
@Expose()  
@IsDate()
fecha: Date;
@Expose()  
@Type((type) => Servicio)
servicio: Servicio;
@Expose()  
@Type((type) => Empleado)
empleado: Empleado;
@Expose()  
@Type((type) => Proyecto)
proyecto: Proyecto;


}