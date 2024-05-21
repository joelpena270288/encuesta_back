import { Test, TestingModule } from '@nestjs/testing';
import { ReportTrabajadorConduceController } from './report-trabajador-conduce.controller';
import { ReportTrabajadorConduceService } from './report-trabajador-conduce.service';

describe('ReportTrabajadorConduceController', () => {
  let controller: ReportTrabajadorConduceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportTrabajadorConduceController],
      providers: [ReportTrabajadorConduceService],
    }).compile();

    controller = module.get<ReportTrabajadorConduceController>(ReportTrabajadorConduceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
