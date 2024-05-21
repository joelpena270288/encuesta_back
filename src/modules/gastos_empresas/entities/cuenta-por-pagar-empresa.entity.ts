import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import {Status} from '../../../EntityStatus/entity.estatus.enum'
  
  @Entity('cuentas_por_pagar_empresa')
  export class CuentasPorPagarEmpresa extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;  
    @Column({ type: 'decimal', nullable: false, default: 0, precision: 10, scale: 2 })
    montoinicial: number;
    @Column({ type: 'decimal', nullable: false, default: 0, precision: 10, scale: 2 })
    montorestante: number; 
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
  }