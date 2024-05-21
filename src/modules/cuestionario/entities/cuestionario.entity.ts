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
  import {Encuesta } from '../../encuesta/entities/encuesta.entity'
  @Entity('cuestionarios')
export class Cuestionario {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'integer', nullable: false })
    resultado: number;
    @ManyToOne(() => Encuesta, (encuesta) => encuesta.cuestionarios)
    encuesta: Encuesta;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;

}
