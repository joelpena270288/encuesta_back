import { Test, TestingModule } from '@nestjs/testing';
import { PagoGastoController } from './pago-gasto.controller';
import { PagoGastoService } from './pago-gasto.service';

describe('PagoGastoController', () => {
  let controller: PagoGastoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoGastoController],
      providers: [PagoGastoService],
    }).compile();

    controller = module.get<PagoGastoController>(PagoGastoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
