import { Test, TestingModule } from '@nestjs/testing';
import { GastoItemService } from './gasto_item.service';

describe('GastoItemService', () => {
  let service: GastoItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastoItemService],
    }).compile();

    service = module.get<GastoItemService>(GastoItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
