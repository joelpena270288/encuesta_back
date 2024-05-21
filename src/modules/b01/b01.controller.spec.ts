import { Test, TestingModule } from '@nestjs/testing';
import { B01Controller } from './b01.controller';
import { B01Service } from './b01.service';

describe('B01Controller', () => {
  let controller: B01Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [B01Controller],
      providers: [B01Service],
    }).compile();

    controller = module.get<B01Controller>(B01Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
