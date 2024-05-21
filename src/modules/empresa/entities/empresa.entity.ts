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
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { CuentasEmpresa } from '../../cuentas-empresa/entities/cuentas-empresa.entity';


@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', nullable: false })
  nombre: string;
  @Column({ type: 'varchar',nullable: true })
  logo: string;
  @Column({ type: 'varchar', length: 250, nullable: true })
  direccion: string;
  @Column({ type: 'varchar', nullable: true })
  rnc: string;
  @Column({ type: 'varchar', nullable: true })
  telefono: string;
  @Column({ type: 'varchar', nullable: false, default: "SIGLER" })
  idetificador: string;
  @OneToMany(() => Proyecto, (proyecto) => proyecto.empresa)
  proyectos: Proyecto[];
  @OneToMany(() => Empleado, (empleado) => empleado.empresa)
  empleados: Empleado[];

  @OneToMany(() => CuentasEmpresa, (cuenta) => cuenta.empresa)
  cuentas: CuentasEmpresa[];

   @Column({ type: 'varchar', nullable: true })
     email: string; 
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
