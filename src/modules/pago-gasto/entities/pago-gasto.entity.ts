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



import { Status } from "../../../EntityStatus/entity.estatus.enum";
import { GastosEmpresa } from "../../gastos_empresas/entities/gastos_empresa.entity";
import { CuentasEmpresa } from '../../cuentas-empresa/entities/cuentas-empresa.entity';
@Entity('pagos_gastos')
export class PagoGasto {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: true})    
    numerocheque: string;
    @Column({ type: 'varchar', nullable: true})    
    numerocTranferencia: string;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    pago: number;
    @ManyToOne(() => GastosEmpresa, (gastoempresa) => gastoempresa.pagos, {   
        nullable: false,
      })
      gastoempresa: GastosEmpresa; 
      @ManyToOne(() => CuentasEmpresa, (cuenta) => cuenta.pagosgastos, {   
        nullable: false,
		 eager: true,
      })
      cuenta: CuentasEmpresa; 
      @Column({ type: 'varchar', nullable: false, default: 'DOP' })
      simbolomoneda: string;
      
      @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2, default: 0 })
      monedanacional: number;
      @Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
status: string;

@CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
createdAt: Date;
@CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
updatedAt: Date;
}
