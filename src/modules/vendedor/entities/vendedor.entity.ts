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
  import { Grupo} from '../../grupo/entities/grupo.entity';
  import { Status} from '../../../EntityStatus/entity.estatus.enum';
  import {Venta} from '../../venta/entities/venta.entity';

  @Entity('vendedores')
export class Vendedor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    lastname: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string;
    @Column({ type: 'varchar', length: 16, nullable: true })
    phone: string;
    @Column({ type: 'varchar', length: 20, nullable: true,unique: true })
    documento: string;
   
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 8 })
    status: string;
    @ManyToOne(() => Grupo, (grupo) => grupo.vendedores,{eager:true})
    grupo: Grupo;
    @OneToMany(() => Venta, (venta) => venta.vendedor)
    ventas: Venta[];
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;


}
