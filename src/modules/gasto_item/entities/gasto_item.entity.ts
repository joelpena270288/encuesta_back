
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
  import {GastosEmpresa } from '../../gastos_empresas/entities/gastos_empresa.entity';
import { Status } from '../../../EntityStatus/entity.estatus.enum';
import { Equipo } from '../../equipos/entities/equipo.entity';
  @Entity('gastos_items') 
export class GastoItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false })
    descripcion: string;
   @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    cantidad: number;	
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    importeimpuesto: number;
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    preciounitario: number;
    @Column({ type: 'decimal', nullable: false,  precision: 10, scale: 2 })
    importe: number;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    valortotal: number;
    @ManyToOne(() => GastosEmpresa, (gasto) => gasto.gastosItems, {
        nullable: false,
       
      })
     gasto: GastosEmpresa;
     @ManyToOne(() => Equipo, (equipo) => equipo.gastosItems, {
      nullable: true,
      eager: true
    })
   equipo: Equipo;
	
    @Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
    status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;


}
