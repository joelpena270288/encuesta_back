import { Injectable } from '@nestjs/common';
import { CreateGastoItemDto } from './dto/create-gasto_item.dto';
import { UpdateGastoItemDto } from './dto/update-gasto_item.dto';

@Injectable()
export class GastoItemService {
  create(createGastoItemDto: CreateGastoItemDto) {
    return 'This action adds a new gastoItem';
  }

  findAll() {
    return `This action returns all gastoItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gastoItem`;
  }

  update(id: number, updateGastoItemDto: UpdateGastoItemDto) {
    return `This action updates a #${id} gastoItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} gastoItem`;
  }
}
