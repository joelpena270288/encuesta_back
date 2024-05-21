import { Status} from '../../../EntityStatus/entity.estatus.enum';
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
  @Entity('B14')
export class B14 {
	 @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 11, nullable: false })
    valor: string;
    @Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
    status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'fecha', nullable: false })
    fecha: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
