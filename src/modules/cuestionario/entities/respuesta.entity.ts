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
  import {Cuestionario} from './cuestionario.entity';
  @Entity('respuestas')
export class Respuesta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
   idpregunta: string;
   @Column({ type: 'boolean', nullable: false, default: false })
   respuesta: boolean;
   @ManyToMany(() => Cuestionario, (cuestionario) => cuestionario.respuestas)
  cuestionarios: Cuestionario[];
}
