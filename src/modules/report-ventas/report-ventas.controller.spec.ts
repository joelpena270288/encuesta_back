import { Test, TestingModule } from '@nestjs/testing';
import { ReportVentasController } from './report-ventas.controller';
import { ReportVentasService } from './report-ventas.service';

describe('ReportVentasController', () => {
  let controller: ReportVentasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportVentasController],
      providers: [ReportVentasService],
    }).compile();

    controller = module.get<ReportVentasController>(ReportVentasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
