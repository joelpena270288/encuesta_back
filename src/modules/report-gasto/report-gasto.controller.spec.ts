import { Test, TestingModule } from '@nestjs/testing';
import { ReportGastoController } from './report-gasto.controller';
import { ReportGastoService } from './report-gasto.service';

describe('ReportGastoController', () => {
  let controller: ReportGastoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportGastoController],
      providers: [ReportGastoService],
    }).compile();

    controller = module.get<ReportGastoController>(ReportGastoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
