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
  import { User } from '../../users/entities/user.entity';
  import { Vendedor} from '../../vendedor/entities/vendedor.entity';
  import { Status} from '../../../EntityStatus/entity.estatus.enum';
  import {Kpi} from '../../kpi/entities/kpi.entity';
  import {RangoDescuesto} from './rango-descuesto.entity';
  import {RangoEncuesta} from './rango-encuesta.entity';
  import {RangoVenta} from './rango-venta.entity';
  @Entity('grupos')
export class Grupo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string; 
    @Column({ type: 'varchar', length: 100, nullable: false, default: 'red' })
    color: string; 
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
   
    @OneToMany(() => Vendedor, (vendedor) => vendedor.grupo)
    vendedores: Vendedor[];
    @ManyToOne(() => Kpi, (kpi) => kpi.grupos,{eager:true})
    kpi: Kpi;
    @ManyToMany(() => RangoDescuesto, {
      cascade: true,    
      eager: true,
     
    } )
    @JoinTable()
    rangoDescueto: RangoDescuesto[];
    @ManyToMany(() => RangoEncuesta, {
      cascade: true,    
      eager: true,
    
    })
    @JoinTable()
    rangoEncuesta: RangoEncuesta[];
    @ManyToMany(() => RangoVenta, {
      cascade: true,    
      eager: true,
    
    })
    @JoinTable()
    rangoVenta: RangoVenta[];

}
