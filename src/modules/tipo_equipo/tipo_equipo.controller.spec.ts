import { Test, TestingModule } from '@nestjs/testing';
import { TipoEquipoController } from './tipo_equipo.controller';
import { TipoEquipoService } from './tipo_equipo.service';

describe('TipoEquipoController', () => {
  let controller: TipoEquipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoEquipoController],
      providers: [TipoEquipoService],
    }).compile();

    controller = module.get<TipoEquipoController>(TipoEquipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
