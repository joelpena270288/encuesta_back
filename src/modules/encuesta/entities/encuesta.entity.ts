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
  import {Pregunta } from './pregunta.entity';
  import { Cuestionario } from '../../cuestionario/entities/cuestionario.entity';
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  @Entity('encuestas')
export class Encuesta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;
    @Column({ type: 'integer', nullable: true, default: 0 })
    valor: number;
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 8 })
    status: string;
    @ManyToMany(() => Pregunta, (pregunta) => pregunta.encuestas, {
      cascade: true,    
      eager: true,
    })
    @JoinTable()
    preguntas: Pregunta[];
    
    @OneToMany(() => Cuestionario, (cuestionario) => cuestionario.encuesta)
    cuestionarios: Cuestionario[];
    

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
