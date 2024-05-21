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
  @Entity('piezas')
export class Pieza {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: 'integer', nullable: false, default: 0 } )
    cantidad: number;
    @Column({ type: 'varchar', nullable: false })
    nombre: string;
    @Column({ type: 'varchar', nullable: true })
    serie: string;
    @Column({ type: 'varchar', nullable: false })
    descripcion: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
