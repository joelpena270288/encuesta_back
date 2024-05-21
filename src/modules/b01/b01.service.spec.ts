import { Test, TestingModule } from '@nestjs/testing';
import { B01Service } from './b01.service';

describe('B01Service', () => {
  let service: B01Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [B01Service],
    }).compile();

    service = module.get<B01Service>(B01Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
