import { Test, TestingModule } from '@nestjs/testing';
import { B02Controller } from './b02.controller';
import { B02Service } from './b02.service';

describe('B02Controller', () => {
  let controller: B02Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [B02Controller],
      providers: [B02Service],
    }).compile();

    controller = module.get<B02Controller>(B02Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
