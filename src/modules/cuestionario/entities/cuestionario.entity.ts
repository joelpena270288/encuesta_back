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
  import {Encuesta } from '../../encuesta/entities/encuesta.entity';
  import {Respuesta} from './respuesta.entity';
  import {Venta} from '../../venta/entities/venta.entity';
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  @Entity('cuestionarios')
export class Cuestionario {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'integer', nullable: false })
    resultado: number;
    @ManyToOne(() => Encuesta, (encuesta) => encuesta.cuestionarios)
    encuesta: Encuesta;
    @ManyToMany(() => Respuesta, (respuesta) => respuesta.cuestionarios, {
      cascade: true,    
      eager: true,
    })
    @JoinTable()
    respuestas: Respuesta[];
    @ManyToOne(() => Venta, (venta) => venta.cuestionarios)
    venta: Venta;
    @Column({ type: 'varchar', default: Status.ACTIVO, length: 8 })
    status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;

}
