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
  import { Status} from '../../../EntityStatus/entity.estatus.enum';
  import {Grupo} from '../../grupo/entities/grupo.entity';
  @Entity('kpi')
export class Kpi {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string; 
    @Column({ type: 'integer', nullable: false,default:0 })
    indiceEncuesta: string; 
    @Column({ type: 'integer', nullable: false,default:0 })
    indiceVenta: string; 
    @Column({ type: 'integer',  nullable: false,default:0 })
    indiceDescuesto: string; 
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
    @OneToMany(() => Grupo, (grupo) => grupo.kpi)
    grupos: Grupo[];
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;


}
