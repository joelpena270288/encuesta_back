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
    BeforeInsert
  } from 'typeorm';
  import { Empleado } from '../../empleado/entities/empleado.entity';

  @Entity('cargos')
export class Cargo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;  
    @Column({ type: 'varchar', length: 100, nullable: true })
    descripcion: string; 
    @Column({ type: 'varchar', default:'ACTIVO', length: 8 })
    status: string;
    @ManyToMany(() => Empleado, (empleado) => empleado.cargos)
    empleados: Empleado[];
  

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
