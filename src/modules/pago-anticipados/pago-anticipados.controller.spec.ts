import { Test, TestingModule } from '@nestjs/testing';
import { PagoAnticipadosController } from './pago-anticipados.controller';
import { PagoAnticipadosService } from './pago-anticipados.service';

describe('PagoAnticipadosController', () => {
  let controller: PagoAnticipadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagoAnticipadosController],
      providers: [PagoAnticipadosService],
    }).compile();

    controller = module.get<PagoAnticipadosController>(PagoAnticipadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
