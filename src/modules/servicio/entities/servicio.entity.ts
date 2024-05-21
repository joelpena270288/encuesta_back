
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
import { Impuesto } from '../../impuestos/entities/impuesto.entity';
import { Conduce } from '../../conduce/entities/conduce.entity';
@Entity('servicios')
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', nullable: false })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  descripcion: string;
 
  @OneToMany((type) => Conduce, (conduce) => conduce.servicio)
   
  conduces: Conduce[];

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
