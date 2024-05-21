import { Test, TestingModule } from '@nestjs/testing';
import { B02Service } from './b02.service';

describe('B02Service', () => {
  let service: B02Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [B02Service],
    }).compile();

    service = module.get<B02Service>(B02Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
