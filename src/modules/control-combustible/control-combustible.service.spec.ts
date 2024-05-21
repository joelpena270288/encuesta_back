import { Test, TestingModule } from '@nestjs/testing';
import { ControlCombustibleService } from './control-combustible.service';

describe('ControlCombustibleService', () => {
  let service: ControlCombustibleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlCombustibleService],
    }).compile();

    service = module.get<ControlCombustibleService>(ControlCombustibleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
