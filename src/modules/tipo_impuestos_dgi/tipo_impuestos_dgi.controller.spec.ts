import { Test, TestingModule } from '@nestjs/testing';
import { TipoImpuestosDgiController } from './tipo_impuestos_dgi.controller';
import { TipoImpuestosDgiService } from './tipo_impuestos_dgi.service';

describe('TipoImpuestosDgiController', () => {
  let controller: TipoImpuestosDgiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoImpuestosDgiController],
      providers: [TipoImpuestosDgiService],
    }).compile();

    controller = module.get<TipoImpuestosDgiController>(TipoImpuestosDgiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
