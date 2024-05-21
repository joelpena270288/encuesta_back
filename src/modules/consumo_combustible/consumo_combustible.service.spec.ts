import { Test, TestingModule } from '@nestjs/testing';
import { ConsumoCombustibleService } from './consumo_combustible.service';

describe('ConsumoCombustibleService', () => {
  let service: ConsumoCombustibleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumoCombustibleService],
    }).compile();

    service = module.get<ConsumoCombustibleService>(ConsumoCombustibleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
