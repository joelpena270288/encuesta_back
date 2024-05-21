import { Equipo } from '../../equipos/entities/equipo.entity';
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
  @Entity('marcas')
export class Marca {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
    name: string;
    @OneToMany(() => Equipo, (equipo) => equipo.modelo)
    equipos: Equipo[];
    @Column({ type: 'varchar',default: 'ACTIVO', length: 10, nullable: false })
    status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}
