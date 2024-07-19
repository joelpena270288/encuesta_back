
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
  import { Modelo} from '../../modelo/entities/modelo.entity';

  @Entity('marcas')
  export class Marca {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string; 
    @OneToMany(() => Modelo, (modelo) => modelo.marca,{eager: true})
    modelos: Modelo[];
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
    @Column({ type: 'boolean', default: false })
    competencia: boolean;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

  }
