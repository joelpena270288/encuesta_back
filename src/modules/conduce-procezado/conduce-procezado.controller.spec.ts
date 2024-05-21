import { Test, TestingModule } from '@nestjs/testing';
import { ConduceProcezadoController } from './conduce-procezado.controller';
import { ConduceProcezadoService } from './conduce-procezado.service';

describe('ConduceProcezadoController', () => {
  let controller: ConduceProcezadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConduceProcezadoController],
      providers: [ConduceProcezadoService],
    }).compile();

    controller = module.get<ConduceProcezadoController>(ConduceProcezadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
