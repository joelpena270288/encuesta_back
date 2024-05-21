import { Test, TestingModule } from '@nestjs/testing';
import { EncuestaController } from './encuesta.controller';
import { EncuestaService } from './encuesta.service';

describe('EncuestaController', () => {
  let controller: EncuestaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncuestaController],
      providers: [EncuestaService],
    }).compile();

    controller = module.get<EncuestaController>(EncuestaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
