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
  import {Marca} from '../../marca/entities/marca.entity';
  import {Vehiculo} from '../../venta/entities/vehiculo.entity';
  @Entity('modelos')
export class Modelo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string; 
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
    @ManyToOne(() => Marca, (marca) => marca.modelos)
    marca: Marca;
    @Column({ type: 'boolean', default: false })
    competencia: boolean;
    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.modelo)
    vehiculos: Vehiculo[];
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
