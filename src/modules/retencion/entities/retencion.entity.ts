import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  @Entity('retenciones')
export class Retencion {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false })
    name: string;
    @Column({ type: 'varchar', nullable: true })
    descripcion: string;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 3 })
   valorimpuesto: number;
   @Column({ type: 'decimal', nullable: false, precision: 10, scale: 3 })
   valorretencion: number;
   @Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
   status: string;
   @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
   createdAt: Date; 
   @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
   updatedAt: Date;

}
