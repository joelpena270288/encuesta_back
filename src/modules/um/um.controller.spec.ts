import { Test, TestingModule } from '@nestjs/testing';
import { UmController } from './um.controller';
import { UmService } from './um.service';

describe('UmController', () => {
  let controller: UmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UmController],
      providers: [UmService],
    }).compile();

    controller = module.get<UmController>(UmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
