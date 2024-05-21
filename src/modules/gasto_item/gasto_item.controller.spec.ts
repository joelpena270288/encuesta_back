import { Test, TestingModule } from '@nestjs/testing';
import { GastoItemController } from './gasto_item.controller';
import { GastoItemService } from './gasto_item.service';

describe('GastoItemController', () => {
  let controller: GastoItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastoItemController],
      providers: [GastoItemService],
    }).compile();

    controller = module.get<GastoItemController>(GastoItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
