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
  import {Conduce} from '../../conduce/entities/conduce.entity';
  @Entity('materiales')
export class Material {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string;
    @OneToMany(() => Conduce, (conduce) => conduce.material)
    conduces: Conduce[];
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
  }


