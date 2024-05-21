import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuestionarioService } from './cuestionario.service';
import { CreateCuestionarioDto } from './dto/create-cuestionario.dto';
import { UpdateCuestionarioDto } from './dto/update-cuestionario.dto';

@Controller('cuestionario')
export class CuestionarioController {
  constructor(private readonly cuestionarioService: CuestionarioService) {}

  @Post()
  create(@Body() createCuestionarioDto: CreateCuestionarioDto) {
    return this.cuestionarioService.create(createCuestionarioDto);
  }

  @Get()
  findAll() {
    return this.cuestionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuestionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuestionarioDto: UpdateCuestionarioDto) {
    return this.cuestionarioService.update(+id, updateCuestionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuestionarioService.remove(+id);
  }
}
