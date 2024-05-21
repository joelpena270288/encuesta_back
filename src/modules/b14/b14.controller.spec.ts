import { Test, TestingModule } from '@nestjs/testing';
import { B14Controller } from './b14.controller';
import { B14Service } from './b14.service';

describe('B14Controller', () => {
  let controller: B14Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [B14Controller],
      providers: [B14Service],
    }).compile();

    controller = module.get<B14Controller>(B14Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
