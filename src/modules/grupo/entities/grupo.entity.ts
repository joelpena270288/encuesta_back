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
  import { User } from '../../users/entities/user.entity';
  import { Vendedor} from '../../vendedor/entities/vendedor.entity';
  import { Status} from '../../../EntityStatus/entity.estatus.enum'
  @Entity('grupos')
export class Grupo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string; 
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
    status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
    @OneToMany(() => User, (user) => user.grupo)
    users: User[];
    @OneToMany(() => User, (user) => user.grupo)
    vendedores: Vendedor[];
}
