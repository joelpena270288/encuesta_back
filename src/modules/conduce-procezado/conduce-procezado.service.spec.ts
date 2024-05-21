import { Test, TestingModule } from '@nestjs/testing';
import { ConduceProcezadoService } from './conduce-procezado.service';

describe('ConduceProcezadoService', () => {
  let service: ConduceProcezadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConduceProcezadoService],
    }).compile();

    service = module.get<ConduceProcezadoService>(ConduceProcezadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
