import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateB14Dto } from './dto/create-b14.dto';
import { UpdateB14Dto } from './dto/update-b14.dto';
import { B14 } from './entities/b14.entity';
import { Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class B14Service {
  constructor(
    @Inject('B14_REPOSITORY')
    private b14Repository: Repository<B14>,
  ) {}

  async create(createB14Dto: CreateB14Dto): Promise<boolean> {
    for (let index = createB14Dto.init; index <= createB14Dto.end; index++) {
      const foundb14: B14 = await this.b14Repository
        .createQueryBuilder('b14')
        .where('b14.status = :estado', { estado: Status.ACTIVO })
        .andWhere('b14.fecha >= :fecha', { fecha: new Date() })
        .andWhere('b14.valor = :valor', { valor: 'B1' + index })
        .getOne();

      if (!foundb14) {
        const b14: B14 = new B14();
       
       
        b14.fecha =createB14Dto.fecha;

        b14.valor = 'B1' + index;
        try {
          await this.b14Repository.save(b14);
        } catch (e) {
          console.log('Error al insertar');
        }
      }
    }
    return true;
  }

  async findAll(): Promise<B14[]> {
    const foundb14: B14[] = await this.b14Repository
      .createQueryBuilder('b14')
      .addOrderBy('b14.valor')
      .where('b14.status = :estado', { estado: Status.ACTIVO })
      .andWhere('b14.fecha >= :fecha', { fecha: new Date() })
      .getMany();

    return foundb14;
  }

  async findOne(): Promise<B14> {
    const foundb14: B14 = await this.b14Repository
      .createQueryBuilder('b14')
      .addOrderBy('b14.valor')
      .where('b14.status = :estado', { estado: Status.ACTIVO })
      .andWhere('b14.fecha >= :fecha', { fecha: new Date() })
      .getOne();
    if (!foundb14) {
      throw new NotFoundException('No quedan consecutivos B14 disponibles');
    }
    return foundb14;
  }

  update(id: number, updateB14Dto: UpdateB14Dto) {
    return `This action updates a #${id} b14`;
  }

  remove(id: number) {
    return `This action removes a #${id} b14`;
  }
}
