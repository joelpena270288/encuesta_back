import { Test, TestingModule } from '@nestjs/testing';
import { B11Controller } from './b11.controller';
import { B11Service } from './b11.service';

describe('B11Controller', () => {
  let controller: B11Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [B11Controller],
      providers: [B11Service],
    }).compile();

    controller = module.get<B11Controller>(B11Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
