import { Test, TestingModule } from '@nestjs/testing';
import { PagoGastoService } from './pago-gasto.service';

describe('PagoGastoService', () => {
  let service: PagoGastoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagoGastoService],
    }).compile();

    service = module.get<PagoGastoService>(PagoGastoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
