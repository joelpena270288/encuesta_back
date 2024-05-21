import { Test, TestingModule } from '@nestjs/testing';
import { ServicioProcesadoController } from './servicio-procesado.controller';
import { ServicioProcesadoService } from './servicio-procesado.service';

describe('ServicioProcesadoController', () => {
  let controller: ServicioProcesadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicioProcesadoController],
      providers: [ServicioProcesadoService],
    }).compile();

    controller = module.get<ServicioProcesadoController>(ServicioProcesadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
