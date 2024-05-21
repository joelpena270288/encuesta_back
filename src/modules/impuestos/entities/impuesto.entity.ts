
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
  @Entity('impuestos') 
export class Impuesto {
@PrimaryGeneratedColumn('uuid')
id: string;
@Column({ type: 'varchar', unique: true, nullable: false })
name: string;
@Column({ type: 'varchar',  nullable: false })
descripcion: string;
@Column({ type: 'decimal', nullable: false, precision: 10, scale: 3 })
valor: number;
@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
createdAt: Date;
@CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
updatedAt: Date;




}
