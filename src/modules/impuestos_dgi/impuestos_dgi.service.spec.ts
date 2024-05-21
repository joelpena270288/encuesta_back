import { Test, TestingModule } from '@nestjs/testing';
import { ImpuestosDgiService } from './impuestos_dgi.service';

describe('ImpuestosDgiService', () => {
  let service: ImpuestosDgiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImpuestosDgiService],
    }).compile();

    service = module.get<ImpuestosDgiService>(ImpuestosDgiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
