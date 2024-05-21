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
import { Cargo } from '../../cargo/entities/cargo.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Conduce } from '../../conduce/entities/conduce.entity';
@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 250, nullable: true })
  lastname: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;
  @Column({ type: 'varchar', length: 16, nullable: true })
  phone: string;
  @Column({ type: 'varchar', length: 20, nullable: true,unique: true })
  cedule: string;
  @Column({ type: 'varchar', length: 20, nullable: true,unique: true })
  passport: string;
  
  @ManyToOne(() => Empresa, (empresa) => empresa.proyectos)
  empresa: Empresa;
  @Column({ type: 'varchar', default: 'ACTIVO', length: 8 })
  status: string;
  @ManyToMany(() => Cargo, (cargo) => cargo.empleados,{ eager: true })
   @JoinTable()
  cargos: Cargo[];
  @OneToMany(() => Conduce, (conduce) => conduce.empleado)
  conduces: Conduce[];
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_ingreso', nullable: true })
  fecha: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
