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
    @Column({type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2})
    indiceEncuesta: number; 
     @Column({type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2})
    indiceVenta: number; 
    @Column({type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2})
    indiceDescuesto: number; 
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
   
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;


}
