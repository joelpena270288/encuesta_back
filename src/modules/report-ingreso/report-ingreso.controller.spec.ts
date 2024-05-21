import { Test, TestingModule } from '@nestjs/testing';
import { ReportIngresoController } from './report-ingreso.controller';
import { ReportIngresoService } from './report-ingreso.service';

describe('ReportIngresoController', () => {
  let controller: ReportIngresoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportIngresoController],
      providers: [ReportIngresoService],
    }).compile();

    controller = module.get<ReportIngresoController>(ReportIngresoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
