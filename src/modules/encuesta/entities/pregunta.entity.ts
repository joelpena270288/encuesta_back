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
  import { Encuesta} from './encuesta.entity'
  @Entity('preguntas')
export class Pregunta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false })
   text: string;
   @Column({ type: 'integer', nullable: false })
   valor: number;
    @Column({ type: 'boolean', nullable: false, default: true })
   respuesta: boolean;
   @ManyToMany(() => Encuesta, (encuesta) => encuesta.preguntas)
   encuestas: Encuesta[];
   @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
   createdAt: Date;
   @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
   updatedAt: Date;

}
