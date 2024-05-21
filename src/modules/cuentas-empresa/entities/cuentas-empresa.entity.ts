import { Moneda } from '../../moneda/entities/moneda.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
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
import { Status } from '../../../EntityStatus/entity.estatus.enum';
import { PagoFactura } from '../../pago-factura/entities/pago-factura.entity';
import { PagoGasto } from '../../pago-gasto/entities/pago-gasto.entity';
import { PagoAnticipado } from '../../pago-anticipados/entities/pago-anticipado.entity';
import {ImpuestosDgi} from '../../impuestos_dgi/entities/impuestos_dgi.entity';

  @Entity('cuentas_empresa')
export class CuentasEmpresa {
    @PrimaryGeneratedColumn('uuid')
  id: string;
    @ManyToOne(() => Empresa, (empresa) => empresa.cuentas, {   
        nullable: false,
      })
      empresa: Empresa;

      @ManyToOne(() => Moneda, (moneda) => moneda.cuentas, {   
        nullable: false,
		eager: true
      })
      moneda: Moneda; 
      @Column({ type: 'varchar', nullable: false })
      banco: string;
      @Column({ type: 'varchar', nullable: false })
      numerocuenta: string;
      @OneToMany(() => PagoFactura, (pagos) => pagos.cuenta, {
        nullable: true
       
      })
      pagos: PagoFactura[];
      @OneToMany(() => PagoGasto, (pagosgastos) => pagosgastos.cuenta, {
        nullable: true
       
      })
      pagosgastos: PagoGasto[];

      @OneToMany(() => PagoAnticipado, (pagosanticipados) => pagosanticipados.cuenta, {
        nullable: true
       
      })
      pagosanticipados: PagoAnticipado[];
      @OneToMany(() => ImpuestosDgi, (impuestodgi) => impuestodgi.tipo)
impuestodgi: ImpuestosDgi[];

      @Column({ type: 'varchar', length: 25, nullable: true,default: Status.ACTIVO })
    status: string; 

      @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
      createdAt: Date;
      @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
      updatedAt: Date;
    }



