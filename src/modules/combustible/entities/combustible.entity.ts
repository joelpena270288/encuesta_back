import {EntradaCombustible} from "../../entrada-combustible/entities/entrada-combustible.entity"
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
import { CapacidadTanque } from "./capacidad-tanque.entity";
import { ConsumoCombustible } from "../../consumo_combustible/entities/consumo_combustible.entity";
  @Entity('combustibles')
export class Combustible {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', unique: true, nullable: false })
    name: string;
    @OneToMany(() => EntradaCombustible, (entradaCombustible) => entradaCombustible.combustible)
    entradaCombustible: EntradaCombustible[];
    @OneToMany(() => ConsumoCombustible, (consumoCombustible) => consumoCombustible.combustible)
    consumo: ConsumoCombustible[];
    
    @OneToOne((type) => CapacidadTanque, {
      cascade: true,
      nullable: false,
      eager: true,
    })
    @JoinColumn({ name: 'capacidad_tanque_id' })
    capacidadTanque: CapacidadTanque;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;
}
