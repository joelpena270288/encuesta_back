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
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Factura } from '../../factura/entities/factura.entity';
import { Cotizacion } from '../../cotizacion/entities/cotizacion.entity';
import { GastosEmpresa} from '../../gastos_empresas/entities/gastos_empresa.entity';
import { Conduce } from '../../conduce/entities/conduce.entity';
import { StatusProyecto } from '../status.enum';
import { ConduceProcezado } from '../../conduce-procezado/entities/conduce-procezado.entity';
import { PreFactura } from '../../pre-factura/entities/pre-factura.entity';
import { ConsumoCombustible } from '../../consumo_combustible/entities/consumo_combustible.entity';
@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.proyectos)
  empresa: Empresa;
  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos, { eager: true })
  cliente: Cliente;

  @OneToMany(() => Cotizacion, (cotizacion) => cotizacion.proyecto, {
    nullable: true,
    eager: true,
    cascade: true
  })
  cotizacion: Cotizacion[];

  @OneToMany(() => GastosEmpresa, (gasto) => gasto.proyecto,{cascade: true})
  gastos: GastosEmpresa[];

  @OneToMany(() => Conduce, (conduce) => conduce.proyecto,{ nullable: true, cascade: true
    })
  conduces: Conduce[];
  @OneToMany(() => ConduceProcezado, (procezados) => procezados.proyecto, {
    nullable: true,
    cascade: true
   
  })
  conducesprocesados: ConduceProcezado[];

  @OneToMany(() => PreFactura, (prefactura) => prefactura.proyecto,{
    nullable: true,
    cascade: true
  
  })
  prefacturas: PreFactura[];
  @OneToMany(() => Factura, (factura) => factura.proyecto,{
    nullable: true,
    cascade: true
   
  })
  facturas: Factura[];
  
  @OneToMany(() => ConsumoCombustible, (consumo_combustible) => consumo_combustible.proyecto, {
    nullable: true,
    eager: true,
    cascade: true
  })
  consumo_combustibles: ConsumoCombustible[];
 
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_inicio', nullable: true })
  fecha_inicio: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_fin', nullable: true })
  fecha_fin: Date;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    default: StatusProyecto.CREADO,
  })
  status: string;
  @Column({ type: 'boolean',default: false })
  ajuste: boolean;
  @Column({  nullable: false ,default: 0})
  consecutivo: number; 
  @Column({ type: 'varchar', nullable: true })
  notacotizacion: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
