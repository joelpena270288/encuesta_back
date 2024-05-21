
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
import { TipoEquipo } from '../../tipo_equipo/entities/tipo_equipo.entity';
import { Marca } from '../../marca/entities/marca.entity';
import { ConsumoCombustible } from '../../consumo_combustible/entities/consumo_combustible.entity';
import {GastoItem} from '../../gasto_item/entities/gasto_item.entity';
import {Inventario} from '../../inventario/entities/inventario.entity';
  @Entity('equipos')
export class Equipo {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', unique: true, length: 10, nullable: true })
    placa: string;
    @Column({ type: 'varchar', unique: true, length: 100, nullable: true })
    chasis: string;
    @Column({ type: 'int', nullable: true })
    anno: number;
    @Column({ type: 'varchar', nullable: false })
    color: string;
    @Column({ type: 'varchar',  nullable: false, default: 'N/A' })
    modelo: string;
	 @Column({ type: 'varchar',  nullable: true })
    metraje: string;
	
    @Column({ type: 'varchar', unique: true, length: 8, nullable: false })
    ficha: string;
    @ManyToOne(() => Marca, (marca) => marca.equipos,  { eager: true, nullable: false })
    marca: Marca;
    @Column({ type: 'varchar', length: 10,default: 'ACTIVO', nullable: false })
    status: string;
    @OneToMany(() => Conduce, (conduce) => conduce.equipo)
    conduces: Conduce[];
    @ManyToOne(() => TipoEquipo, (tipo) => tipo.equipos, {
      eager: true,
      nullable: false,
    })
    tipo: TipoEquipo;
    @OneToMany(() => ConsumoCombustible, (consumo_combustible) => consumo_combustible.equipo)
    consumo_combustibles: ConsumoCombustible[];
    @OneToMany(() => GastoItem, (gasto) => gasto.equipo)
    gastosItems: GastoItem[];
    @OneToMany(() => Inventario, (inventario) => inventario.equipo)
    inventario: Inventario[];
    
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;

}
