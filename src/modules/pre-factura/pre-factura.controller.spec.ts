import { Test, TestingModule } from '@nestjs/testing';
import { PreFacturaController } from './pre-factura.controller';
import { PreFacturaService } from './pre-factura.service';

describe('PreFacturaController', () => {
  let controller: PreFacturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreFacturaController],
      providers: [PreFacturaService],
    }).compile();

    controller = module.get<PreFacturaController>(PreFacturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
