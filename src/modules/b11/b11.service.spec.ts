import { Test, TestingModule } from '@nestjs/testing';
import { B11Service } from './b11.service';

describe('B11Service', () => {
  let service: B11Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [B11Service],
    }).compile();

    service = module.get<B11Service>(B11Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
