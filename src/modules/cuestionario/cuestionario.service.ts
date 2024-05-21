import { Injectable } from '@nestjs/common';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';

@Injectable()
export class CuestionarioService {
  create(createCuestionarioDto: CreateCuestionarioDto) {
    return 'This action adds a new cuestionario';
  }

  findAll() {
    return `This action returns all cuestionario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuestionario`;
  }

  update(id: number, updateCuestionarioDto: UpdateCuestionarioDto) {
    return `This action updates a #${id} cuestionario`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuestionario`;
  }
}
