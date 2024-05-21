import { Test, TestingModule } from '@nestjs/testing';
import { CuentasEmpresaController } from './cuentas-empresa.controller';
import { CuentasEmpresaService } from './cuentas-empresa.service';

describe('CuentasEmpresaController', () => {
  let controller: CuentasEmpresaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentasEmpresaController],
      providers: [CuentasEmpresaService],
    }).compile();

    controller = module.get<CuentasEmpresaController>(CuentasEmpresaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
