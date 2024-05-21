import { Test, TestingModule } from '@nestjs/testing';
import { GastosEmpresasService } from './gastos_empresas.service';

describe('GastosEmpresasService', () => {
  let service: GastosEmpresasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GastosEmpresasService],
    }).compile();

    service = module.get<GastosEmpresasService>(GastosEmpresasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
