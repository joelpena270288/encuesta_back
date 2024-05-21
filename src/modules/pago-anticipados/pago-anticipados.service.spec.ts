import { Test, TestingModule } from '@nestjs/testing';
import { PagoAnticipadosService } from './pago-anticipados.service';

describe('PagoAnticipadosService', () => {
  let service: PagoAnticipadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagoAnticipadosService],
    }).compile();

    service = module.get<PagoAnticipadosService>(PagoAnticipadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
