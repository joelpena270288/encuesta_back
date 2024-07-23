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
    @Column({ type: 'boolean', default: false })
    competencia: boolean;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
   
    @OneToMany(() => Vendedor, (vendedor) => vendedor.grupo)
    vendedores: Vendedor[];
   
    @OneToMany(() => RangoDescuesto,(rangoDescueto)=> rangoDescueto.grupo, {
      cascade: true,    
      eager: true,
     
    } )
   
    rangoDescueto: RangoDescuesto[];
    @OneToMany(() => RangoEncuesta,(rangoencuesta)=> rangoencuesta.grupo, {
      cascade: true,    
      eager: true,
    
    })
   
    rangoEncuesta: RangoEncuesta[];
    @OneToMany(() => RangoVenta,(rangoVenta)=>rangoVenta.grupo, {
      cascade: true,    
      eager: true,
    
    })
    
    rangoVenta: RangoVenta[];

}
