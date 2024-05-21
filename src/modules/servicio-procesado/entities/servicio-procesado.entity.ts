import { Factura } from '../../factura/entities/factura.entity';
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

  @Entity('servicios_procesados')
export class ServicioProcesado {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2  })
    cantidad: number;
    @Column({ type: 'varchar', nullable: false })
    UM: string;
   
    @Column({ type: 'varchar', nullable: false })
    nombreServicio: string;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    precio: number;
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    valorimpuesto: number;
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    importeimpuesto: number;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    importe: number;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    valortotal: number;    
    @PrimaryGeneratedColumn()
    consecutivo: number;  
    @Column({ type: 'varchar', nullable: false })
    idprefactura: string;
    @ManyToOne(() => Factura, (factura) => factura.servicioProcesado, {
     
      nullable: false,
    })
    factura: Factura;
    
    
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
