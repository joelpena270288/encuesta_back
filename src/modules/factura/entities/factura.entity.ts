
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
  import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { ConduceProcezado } from '../../conduce-procezado/entities/conduce-procezado.entity';
import { StatusFactura } from './fatura-status.enum';
import { TipoFactura } from './factura-tipo.enum';
import { TipoImpuestoFactura } from './factura-impuesto.enum';
import { PreFactura } from '../../pre-factura/entities/pre-factura.entity';

import { ServicioProcesado } from '../../servicio-procesado/entities/servicio-procesado.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { CuentasPorCobrar } from './cuenta-por-cobrar.entity';
import { PagoFactura } from '../../pago-factura/entities/pago-factura.entity';
import { TipoPagoFactura } from './factura-tipo-pago.enum';

  @Entity('facturas') 
export class Factura {

    @PrimaryGeneratedColumn('uuid')
    id: string;
   
   
    @OneToMany(() => ServicioProcesado, (servicio_procesado) => servicio_procesado.factura, {
      nullable: true,
      eager: true,
      cascade: true
    })
    servicioProcesado: ServicioProcesado[];
  
    @Column({ type: 'varchar', nullable: false, default: StatusFactura.CREADA })
    status: string;
    @Column({ type: 'varchar', nullable: false, default: TipoFactura.PREFACTURA })
    tipo: string;
    @ManyToOne(() => Proyecto, (proyecto) => proyecto.facturas, {
     
      nullable: false,
    })
    proyecto: Proyecto;
    @ManyToOne(() => Cliente, (cliente) => cliente.facturas, {
     
      nullable: false,
        })
    cliente: Cliente;
    @Column({ type: 'varchar', nullable: false })
    nombreproyecto: string;
    @Column({ type: 'varchar', nullable: true })  
	 @Column({ type: 'varchar', nullable: true,length: 3  })
    tipoimpuesto: string;
	 @Column({ type: 'varchar', nullable: true })
    ncf: string;
	 @Column({ type: 'timestamp', nullable: true })
    fechancf: Date;
    @Column({ type: 'timestamp', nullable: true })
    fechafactura: Date;
    @Column({ type: 'timestamp', nullable: true })
    fechacierre: Date;
    @Column({ type: 'decimal', nullable: false,default: 1, precision: 10, scale: 2 })
    tasadia: number;   
   @Column({ type: 'varchar', nullable: true })
   notaprefactura: string; 
   @Column({ type: 'varchar', nullable: true })
   notafactura: string;
   @Column({ type: 'varchar', nullable: true })
   simbolomoneda: string;
   @OneToOne((type) => CuentasPorCobrar, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'cuenta_por_cobrar_id' })
  cuentaporcobrar: CuentasPorCobrar;
  @Column({  nullable: false ,default: 0})
  consecutivoprefactura: number; 
  @Column({  nullable: false, default: 0 })
  consecutivofactura: number; 
  @OneToMany(() => PagoFactura, (pagos) => pagos.factura, {
    nullable: true,
    eager: true,
    cascade: true
  })
  pagos: PagoFactura[];
  
 

  @Column({ type: 'varchar', nullable: false, default: TipoPagoFactura.TRANSFERENCIA})
  tipoPago: string;
  @Column({  nullable: false, default: 0 })
  dias: number;
  @Column({ type: 'varchar', nullable: true })
  retencion: string;
  @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
  valorretencion: number;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
