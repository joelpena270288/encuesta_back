import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../../../EntityStatus/entity.estatus.enum';
import { GastosEmpresa } from '../../gastos_empresas/entities/gastos_empresa.entity';

@Entity('notas_creditos')
export class NotaCredito extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    type: 'decimal',
    nullable: false,
    default: 0,
    precision: 10,
    scale: 2,
  })
  importe: number;
  @Column({
    type: 'decimal',
    nullable: false,
    default: 0,
    precision: 10,
    scale: 2,
  })
  impuesto: number;
  @Column({ type: 'varchar', nullable: false })
  descripcion: string;
  @Column({ type: 'varchar', length: 20, nullable: false })
  ncf: string;
  @ManyToOne(() => GastosEmpresa, (gasto) => gasto.notascreditos, { nullable: false })
 
  gastoempresa: GastosEmpresa
  @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
  status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'fecha', nullable: false })
  fecha: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
