import { Test, TestingModule } from '@nestjs/testing';
import { PagoFacturaService } from './pago-factura.service';

describe('PagoFacturaService', () => {
  let service: PagoFacturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagoFacturaService],
    }).compile();

    service = module.get<PagoFacturaService>(PagoFacturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
