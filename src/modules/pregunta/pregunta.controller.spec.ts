import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaController } from './pregunta.controller';
import { PreguntaService } from './pregunta.service';

describe('PreguntaController', () => {
  let controller: PreguntaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreguntaController],
      providers: [PreguntaService],
    }).compile();

    controller = module.get<PreguntaController>(PreguntaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
