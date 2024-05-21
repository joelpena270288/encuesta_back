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
  import {Equipo} from '../../equipos/entities/equipo.entity'
  @Entity('inventario') 
export class Inventario {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    cantidad: number;
    @Column({ type: 'varchar', nullable: false })
    nombre: string;
    @Column({ type: 'varchar', nullable: false })
    serie: string;	
    @Column({ type: 'varchar', nullable: false })
    descripcion: string; 
  
    @ManyToOne(() => Equipo, (equipo) => equipo.inventario, {
        nullable: true,
      })
     equipo: Equipo;
     @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    precioUnitario: number;
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    valor: number;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
