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
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  import {Vendedor} from '../../vendedor/entities/vendedor.entity';
import { Vehiculo } from './vehiculo.entity';
import { Cuestionario} from '../../cuestionario/entities/cuestionario.entity';
  @Entity('ventas')
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    nombreCliente: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    telefonoCliente: string;
    @Column({ type: 'varchar', length: 100, nullable: true })
    correoCliente: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    documentoCliente: string;
	@Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    precioVenta: number;
	@Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    precioFinVenta: number;
    @CreateDateColumn({ type: 'timestamp', name: 'fecha', nullable: true })
    fecha: Date;
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 8 })
    status: string;
    @Column({ type: 'varchar', nullable: true })
    iduser: string;
    @OneToOne((type) => Vehiculo, {
      cascade: true,
      nullable: false,
      eager: true,
    })
    @JoinColumn({ name: 'vehiculo_id' })
    vehiculo: Vehiculo;
    @ManyToOne(() => Vendedor, (vendedor) => vendedor.ventas,{eager: true})
    vendedor: Vendedor;
    @OneToMany(() => Cuestionario, (cuestionario) => cuestionario.venta,{eager: true})
  cuestionarios: Cuestionario[];
  
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
