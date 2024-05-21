import { Test, TestingModule } from '@nestjs/testing';
import { ConsumoCombustibleController } from './consumo_combustible.controller';
import { ConsumoCombustibleService } from './consumo_combustible.service';

describe('ConsumoCombustibleController', () => {
  let controller: ConsumoCombustibleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumoCombustibleController],
      providers: [ConsumoCombustibleService],
    }).compile();

    controller = module.get<ConsumoCombustibleController>(ConsumoCombustibleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
