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
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
import { GastosEmpresa } from '../../gastos_empresas/entities/gastos_empresa.entity';
import { TipoDocumento } from '../dto/tipo-documento.enum';
import { EntradaCombustible } from '../../entrada-combustible/entities/entrada-combustible.entity';
  
  @Entity('provedores') 
export class Provedor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false })
    nombre: string;
    @Column({ type: 'varchar', nullable: false })
    direccion: string;
    @Column({ type: 'varchar', nullable: false, unique: true })
    documento: string;
    @Column({ type: 'varchar', nullable: false, default: TipoDocumento.RNC })
    tipodocumento: string;
    @OneToMany(() => GastosEmpresa, (gasto) => gasto.provedor)
    gastos: GastosEmpresa[];
    @OneToMany(() => EntradaCombustible, (gasto) => gasto.provedor)
    entradaCombustible: EntradaCombustible[];
    @Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
    status: string;
    @Column({ type: 'boolean', nullable: false, default: false })
    informal: boolean;
    @Column({ type: 'varchar', length: 16, nullable: true })
    phone: string;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;	
}
