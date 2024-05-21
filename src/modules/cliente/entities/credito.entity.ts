import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('credito_cliente')
export class Credito extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;  
  @Column({ type: 'decimal', nullable: false, default: 0, precision: 10, scale: 2 })
  monto: number; 
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}