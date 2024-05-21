import { Test, TestingModule } from '@nestjs/testing';
import { ConduceService } from './conduce.service';

describe('ConduceService', () => {
  let service: ConduceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConduceService],
    }).compile();

    service = module.get<ConduceService>(ConduceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
