import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import {Status} from '../../../EntityStatus/entity.estatus.enum'
  
  @Entity('capacidad_tanque')
  export class CapacidadTanque extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;  
    @Column({ type: 'decimal', nullable: false, default: 0, precision: 10, scale: 2 })
    capacidad: number;
   
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
  }