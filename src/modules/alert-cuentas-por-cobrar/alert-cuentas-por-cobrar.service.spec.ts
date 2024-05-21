import { Test, TestingModule } from '@nestjs/testing';
import { AlertCuentasPorCobrarService } from './alert-cuentas-por-cobrar.service';

describe('AlertCuentasPorCobrarService', () => {
  let service: AlertCuentasPorCobrarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertCuentasPorCobrarService],
    }).compile();

    service = module.get<AlertCuentasPorCobrarService>(AlertCuentasPorCobrarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
