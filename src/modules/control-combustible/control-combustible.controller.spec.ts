import { Test, TestingModule } from '@nestjs/testing';
import { ControlCombustibleController } from './control-combustible.controller';
import { ControlCombustibleService } from './control-combustible.service';

describe('ControlCombustibleController', () => {
  let controller: ControlCombustibleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControlCombustibleController],
      providers: [ControlCombustibleService],
    }).compile();

    controller = module.get<ControlCombustibleController>(ControlCombustibleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
