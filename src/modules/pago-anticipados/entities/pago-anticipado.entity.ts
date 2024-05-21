
import { Cliente } from '../../cliente/entities/cliente.entity';
import { CuentasEmpresa } from '../../cuentas-empresa/entities/cuentas-empresa.entity';
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
  import { Status } from '../../../EntityStatus/entity.estatus.enum';
  @Entity('pagos_anticipados') 
export class PagoAnticipado {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.pagosanticipados, {
     
        nullable: false,
          })
      cliente: Cliente;
      @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
      pago: number;
      @ManyToOne(() => CuentasEmpresa, (cuenta) => cuenta.pagosanticipados, {   
        nullable: false,
		 eager: true,
      })
      cuenta: CuentasEmpresa; 
      @Column({ type: 'varchar', nullable: true})
      numerocheque: string;
      @Column({ type: 'varchar', nullable: true})
      numeroTransferencia: string;
      @CreateDateColumn({ type: 'timestamp', name: 'fecha_banco' })
      fechaBanco: Date;
      @Column({ type: 'varchar', length: 25, nullable: false,default: Status.ACTIVO })
      status: string; 
      @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
      createdAt: Date; 
      @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
      updatedAt: Date;
  


}
