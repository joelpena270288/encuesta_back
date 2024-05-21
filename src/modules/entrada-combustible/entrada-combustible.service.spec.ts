import { Test, TestingModule } from '@nestjs/testing';
import { EntradaCombustibleService } from './entrada-combustible.service';

describe('EntradaCombustibleService', () => {
  let service: EntradaCombustibleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntradaCombustibleService],
    }).compile();

    service = module.get<EntradaCombustibleService>(EntradaCombustibleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
