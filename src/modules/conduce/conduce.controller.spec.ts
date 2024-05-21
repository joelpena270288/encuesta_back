import { Test, TestingModule } from '@nestjs/testing';
import { ConduceController } from './conduce.controller';
import { ConduceService } from './conduce.service';

describe('ConduceController', () => {
  let controller: ConduceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConduceController],
      providers: [ConduceService],
    }).compile();

    controller = module.get<ConduceController>(ConduceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
