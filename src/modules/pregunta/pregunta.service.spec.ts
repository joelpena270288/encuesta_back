import { Test, TestingModule } from '@nestjs/testing';
import { PreguntaService } from './pregunta.service';

describe('PreguntaService', () => {
  let service: PreguntaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreguntaService],
    }).compile();

    service = module.get<PreguntaService>(PreguntaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
