
import { Equipo } from '../../equipos/entities/equipo.entity';
import { Status } from '../../../EntityStatus/entity.estatus.enum';
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
    BeforeInsert
  } from 'typeorm';
  @Entity('tipo_equipos') 
export class TipoEquipo {
  @PrimaryGeneratedColumn('uuid')
    id: string;
@Column({ type: 'varchar', unique: true, nullable: false })
name: string;
@Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
status: string;
@OneToMany(() => Equipo, (equipo) => equipo.tipo)
equipos: Equipo[];
@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
createdAt: Date;
@CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
updatedAt: Date;


}
