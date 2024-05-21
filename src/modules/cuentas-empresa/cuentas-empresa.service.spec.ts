import { Test, TestingModule } from '@nestjs/testing';
import { CuentasEmpresaService } from './cuentas-empresa.service';

describe('CuentasEmpresaService', () => {
  let service: CuentasEmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuentasEmpresaService],
    }).compile();

    service = module.get<CuentasEmpresaService>(CuentasEmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
