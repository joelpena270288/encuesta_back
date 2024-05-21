import { Test, TestingModule } from '@nestjs/testing';
import { ProvedorService } from './provedor.service';

describe('ProvedorService', () => {
  let service: ProvedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvedorService],
    }).compile();

    service = module.get<ProvedorService>(ProvedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
