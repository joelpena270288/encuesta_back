import { Test, TestingModule } from '@nestjs/testing';
import { CuestionarioController } from './cuestionario.controller';
import { CuestionarioService } from './cuestionario.service';

describe('CuestionarioController', () => {
  let controller: CuestionarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuestionarioController],
      providers: [CuestionarioService],
    }).compile();

    controller = module.get<CuestionarioController>(CuestionarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
