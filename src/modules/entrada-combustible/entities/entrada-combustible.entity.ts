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
  import {Combustible} from '../../combustible/entities/combustible.entity';
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
import { Provedor } from '../../provedor/entities/provedor.entity';
@Entity('entradas_combustibles')
export class EntradaCombustible {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: 'decimal', nullable: false, default: 0, precision: 10, scale: 2 } )
    galones: number;
    @ManyToOne(() => Combustible, (combustible) => combustible.entradaCombustible)
    combustible: Combustible;
    @ManyToOne(() => Provedor, (provedor) => provedor.entradaCombustible)
    provedor: Provedor;
    @Column({ type: 'varchar', nullable: false })
    NCF: string;
    @Column({ type: 'varchar', nullable: false })
    factura: string;
   
 
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    importeimpuesto: number;
    @Column({ type: 'decimal', nullable: false,  precision: 10, scale: 2 })
    importe: number;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    valortotal: number;
  @Column({ type: 'varchar', length: 10,default: Status.ACTIVO, nullable: false })
  status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'fecha', nullable: true })
    fecha: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
