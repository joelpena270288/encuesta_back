import { Test, TestingModule } from '@nestjs/testing';
import { EncuestaService } from './encuesta.service';

describe('EncuestaService', () => {
  let service: EncuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncuestaService],
    }).compile();

    service = module.get<EncuestaService>(EncuestaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
