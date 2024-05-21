
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

import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { Status } from '../../../EntityStatus/entity.estatus.enum';
import{Factura} from '../../factura/entities/factura.entity';
import { PagoAnticipado } from '../../pago-anticipados/entities/pago-anticipado.entity';
import { TipoDocumento } from '../tipo-documento.enum';
import { Credito } from './credito.entity';
@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 250, nullable: false })
    nombre: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    nombrecontacto: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    email: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    direccion: string;
    @Column({ type: 'varchar',length: 16, nullable: true })
    telefono: string;
     @Column({ type: 'varchar', length: 25, nullable: false,default: TipoDocumento.RNC })
    tipoDocumento: string; 
    @Column({ type: 'varchar' ,length: 25, nullable: true })
    rcn: string; 
    @Column({ type: 'varchar', length: 25, nullable: false,default: Status.ACTIVO })
    status: string; 


    @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
    proyectos: Proyecto[];
    @OneToMany(() => PagoAnticipado, (pago) => pago.cliente)
    pagosanticipados: PagoAnticipado[];
    @OneToMany(() => Factura, (factura) => factura.cliente)
    facturas: Factura[];
    @Column({  nullable: false ,default: 0})
     consecutivo: number; 
    @OneToOne((type) => Credito, {
      cascade: true,
      nullable: false,
      eager: true,
    })
    @JoinColumn({ name: 'credito' })
    credito: Credito;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  
}

