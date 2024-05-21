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
  import {Pregunta } from '../../pregunta/entities/pregunta.entity';
  import { Cuestionario } from '../../cuestionario/entities/cuestionario.entity';
  @Entity('encuestas')
export class Encuesta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;
    @Column({ type: 'integer', nullable: false })
    valor: number;
    @OneToMany(() => Pregunta, (pregunta) => pregunta.encuesta)
    preguntas: Pregunta[];
    @OneToMany(() => Cuestionario, (cuestionario) => cuestionario.encuesta)
    cuestionarios: Cuestionario[];
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
