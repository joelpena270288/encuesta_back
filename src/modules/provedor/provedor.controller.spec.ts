import { Test, TestingModule } from '@nestjs/testing';
import { ProvedorController } from './provedor.controller';
import { ProvedorService } from './provedor.service';

describe('ProvedorController', () => {
  let controller: ProvedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvedorController],
      providers: [ProvedorService],
    }).compile();

    controller = module.get<ProvedorController>(ProvedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
