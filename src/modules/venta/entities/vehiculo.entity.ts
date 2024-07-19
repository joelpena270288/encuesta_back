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
  import {Modelo} from '../../modelo/entities/modelo.entity';
  @Entity('vehiculos')
export class Vehiculo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    marca: string;
    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    chasis: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    modelo: string;
    @ManyToOne(() => Modelo, (model) => model.vehiculos,{eager: true, nullable: false })
    model: Modelo;
    @Column({ type: 'varchar', length: 100, nullable: false })
    color: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
  }


