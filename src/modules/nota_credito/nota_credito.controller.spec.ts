import { Test, TestingModule } from '@nestjs/testing';
import { NotaCreditoController } from './nota_credito.controller';
import { NotaCreditoService } from './nota_credito.service';

describe('NotaCreditoController', () => {
  let controller: NotaCreditoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotaCreditoController],
      providers: [NotaCreditoService],
    }).compile();

    controller = module.get<NotaCreditoController>(NotaCreditoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
