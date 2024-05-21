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
  import {Status} from '../../../EntityStatus/entity.estatus.enum'
  @Entity('ventas')
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    nombreCliente: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    telefonoCliente: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    correoCliente: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    documentoCliente: string;
    @CreateDateColumn({ type: 'timestamp', name: 'fecha_ingreso', nullable: true })
    fecha: Date;
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 8 })
    status: string;
    @Column({ type: 'varchar', nullable: true })
    iduser: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
