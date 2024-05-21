import { Test, TestingModule } from '@nestjs/testing';
import { GastosEmpresasController } from './gastos_empresas.controller';
import { GastosEmpresasService } from './gastos_empresas.service';

describe('GastosEmpresasController', () => {
  let controller: GastosEmpresasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastosEmpresasController],
      providers: [GastosEmpresasService],
    }).compile();

    controller = module.get<GastosEmpresasController>(GastosEmpresasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
