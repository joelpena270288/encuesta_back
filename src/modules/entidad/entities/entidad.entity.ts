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
  import { Status} from '../../../EntityStatus/entity.estatus.enum';
  import { TipoImpuestosDgi } from '../../tipo_impuestos_dgi/entities/tipo_impuestos_dgi.entity';
  @Entity('entidades')
export class Entidad {

    @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 11, nullable: false })
  rnc: string;
  @Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
  status: string;
  @OneToMany(() => TipoImpuestosDgi, (tipoimpuesto) => tipoimpuesto.entidad)
  tiposimpuestos: TipoImpuestosDgi[];
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date; 
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
