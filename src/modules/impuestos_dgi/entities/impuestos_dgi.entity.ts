import {TipoImpuestosDgi} from '../../tipo_impuestos_dgi/entities/tipo_impuestos_dgi.entity';
import {CuentasEmpresa} from '../../cuentas-empresa/entities/cuentas-empresa.entity';
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
  @Entity('impuestos_dgi') 
export class ImpuestosDgi {
    @PrimaryGeneratedColumn('uuid')
id: string;

@CreateDateColumn({ type: 'timestamp', name: 'fechapago' })
fechapago: Date;
@Column({ type: 'varchar', unique: false, nullable: false })
periodo: string;
@Column({ type: 'varchar', unique: true, nullable: false })
documento: string;
@Column({ type: 'varchar', nullable: false })
metododepago: string;
@Column({ type: 'varchar', nullable: false })
pagodesde: string;
@Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
valor: number;
@Column({ type: 'decimal', default: 0, nullable: false, precision: 10, scale: 2 })
comision: number;
@Column({ type: 'decimal', default: 0, nullable: false, precision: 10, scale: 2 })
total: number;
  @ManyToOne(() => TipoImpuestosDgi, (tipo) => tipo.impuestodgi, {
    eager: true,
    nullable: false,
  })
tipo: TipoImpuestosDgi;
@ManyToOne(() => CuentasEmpresa, (cuenta) => cuenta.impuestodgi, {
  eager: true,
  nullable: false,
})
cuenta: CuentasEmpresa;
@Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
status: string;
@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
createdAt: Date;
@CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
updatedAt: Date;

}
