import { Test, TestingModule } from '@nestjs/testing';
import { EntradaCombustibleController } from './entrada-combustible.controller';
import { EntradaCombustibleService } from './entrada-combustible.service';

describe('EntradaCombustibleController', () => {
  let controller: EntradaCombustibleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntradaCombustibleController],
      providers: [EntradaCombustibleService],
    }).compile();

    controller = module.get<EntradaCombustibleController>(EntradaCombustibleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
