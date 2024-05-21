import { Test, TestingModule } from '@nestjs/testing';
import { ImpuestosDgiController } from './impuestos_dgi.controller';
import { ImpuestosDgiService } from './impuestos_dgi.service';

describe('ImpuestosDgiController', () => {
  let controller: ImpuestosDgiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImpuestosDgiController],
      providers: [ImpuestosDgiService],
    }).compile();

    controller = module.get<ImpuestosDgiController>(ImpuestosDgiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
