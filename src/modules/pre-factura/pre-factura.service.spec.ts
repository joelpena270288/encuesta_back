import { Test, TestingModule } from '@nestjs/testing';
import { PreFacturaService } from './pre-factura.service';

describe('PreFacturaService', () => {
  let service: PreFacturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PreFacturaService],
    }).compile();

    service = module.get<PreFacturaService>(PreFacturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
