import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Servicio } from '../../servicio/entities/servicio.entity';
import { EstatusConduce } from '../status.enum';

import { Equipo } from '../../equipos/entities/equipo.entity';
import { Material } from '../../material/entities/material.entity';
@Entity('conduces')
export class Conduce {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;
 
  @ManyToOne(() => Proyecto, (proyecto) => proyecto.conduces, {   
    nullable: false,
  })
  proyecto: Proyecto;
  @ManyToOne(() => Empleado, (empleado) => empleado.conduces, {
    eager: true,
    nullable: false,
  })
  empleado: Empleado;
  @ManyToOne(() => Servicio, (servicio) => servicio.conduces, {
    eager: true,
    nullable: false,
  })
  servicio: Servicio;
  @ManyToOne(() => Equipo, (equipo) => equipo.conduces, {
    eager: true,
    nullable: false,
  })
  equipo: Equipo;
  @Column({ type: 'varchar', nullable: false })
  firma_chofer: string;
  @Column({ type: 'varchar', nullable: false })
  firma_cliente: string;
  @Column({ type: 'varchar', nullable: true })
  observaciones: string;
  @Column({ type: 'varchar', nullable: false })
  horaInicio: string;
  @Column({ type: 'varchar', nullable: false })
  horaFin: string;
  @Column({ type: 'varchar', nullable: true })
  desde: string;
  @Column({ type: 'varchar', nullable: true })
  hasta: string;
  @Column({ type: 'int', nullable: true })
  cantViajes: number;
  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2, default: 0   })
  metrosCubicos: number;
   @Column({ type: 'varchar', nullable: false })
  horas: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha', nullable: false })
  fecha: Date;
  @ManyToOne(() => Material, (material) => material.conduces, {
    eager: true,
    nullable: true,
  })
  material: Material;
 
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    default: EstatusConduce.ABIERTO,
  })
  status: string;
  @Column({ type: 'varchar', nullable: false,default: '0.00' })
  horasreportadastrabajado: string;
  @Column({ type: 'varchar', nullable: false ,default: '0.00'})
  horasreportadasequipo: string;
  @Column({ type: 'varchar', nullable: false ,default: '0.00'})
  cantidadConsummoCombustible: string;
  @Column({ type: 'varchar',  nullable: true })
  motivo: string;
  @Column({  nullable: false ,default: 0})
     consecutivo: number; 
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
