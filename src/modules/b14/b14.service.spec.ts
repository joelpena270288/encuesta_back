import { Test, TestingModule } from '@nestjs/testing';
import { B14Service } from './b14.service';

describe('B14Service', () => {
  let service: B14Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [B14Service],
    }).compile();

    service = module.get<B14Service>(B14Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
