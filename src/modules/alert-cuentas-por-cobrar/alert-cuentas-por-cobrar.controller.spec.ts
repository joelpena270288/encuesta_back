import { Test, TestingModule } from '@nestjs/testing';
import { AlertCuentasPorCobrarController } from './alert-cuentas-por-cobrar.controller';
import { AlertCuentasPorCobrarService } from './alert-cuentas-por-cobrar.service';

describe('AlertCuentasPorCobrarController', () => {
  let controller: AlertCuentasPorCobrarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertCuentasPorCobrarController],
      providers: [AlertCuentasPorCobrarService],
    }).compile();

    controller = module.get<AlertCuentasPorCobrarController>(AlertCuentasPorCobrarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
