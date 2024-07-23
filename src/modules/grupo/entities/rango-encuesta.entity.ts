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
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
import { Grupo } from './grupo.entity';
  @Entity('rangos_encuestas')
export class RangoEncuesta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string; 
    @Column({ type: 'integer', default: 0, nullable: false})
    min: number;
    @Column({ type: 'integer', default: 0, nullable: false})
    max: number;
     @Column({type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2})
    valor: number;    
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
    @ManyToOne(() => Grupo, (grupo) => grupo.rangoEncuesta)
    grupo: Grupo;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
