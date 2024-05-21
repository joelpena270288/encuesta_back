import {ImpuestosDgi} from '../../impuestos_dgi/entities/impuestos_dgi.entity';
import {Entidad} from '../../entidad/entities/entidad.entity';
import { Status} from '../../../EntityStatus/entity.estatus.enum';
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
  @Entity('tipos_impuestos_dgi') 
export class TipoImpuestosDgi {

    @PrimaryGeneratedColumn('uuid')
id: string;
@Column({ type: 'varchar', unique: false, nullable: false })
name: string;

@OneToMany(() => ImpuestosDgi, (impuestodgi) => impuestodgi.tipo)
impuestodgi: ImpuestosDgi[];
@ManyToOne(() => Entidad, (entidad) => entidad.tiposimpuestos, {
  eager: true,
  nullable: false,
})
entidad: Entidad;
@Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
status: string;
@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
createdAt: Date;
@CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
updatedAt: Date;

}
