import { Test, TestingModule } from '@nestjs/testing';
import { PagoFacturaController } from './pago-factura.controller';
import { PagoFacturaService } from './pago-factura.service';

describe('PagoFacturaController', () => {
  let controller: PagoFacturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoFacturaController],
      providers: [PagoFacturaService],
    }).compile();

    controller = module.get<PagoFacturaController>(PagoFacturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
