import { Test, TestingModule } from '@nestjs/testing';
import { TipoImpuestosDgiService } from './tipo_impuestos_dgi.service';

describe('TipoImpuestosDgiService', () => {
  let service: TipoImpuestosDgiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoImpuestosDgiService],
    }).compile();

    service = module.get<TipoImpuestosDgiService>(TipoImpuestosDgiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
