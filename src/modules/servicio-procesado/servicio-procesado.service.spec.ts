import { Test, TestingModule } from '@nestjs/testing';
import { ServicioProcesadoService } from './servicio-procesado.service';

describe('ServicioProcesadoService', () => {
  let service: ServicioProcesadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicioProcesadoService],
    }).compile();

    service = module.get<ServicioProcesadoService>(ServicioProcesadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
