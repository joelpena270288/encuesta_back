import { Test, TestingModule } from '@nestjs/testing';
import { ReportCombustibleController } from './report-combustible.controller';
import { ReportCombustibleService } from './report-combustible.service';

describe('ReportCombustibleController', () => {
  let controller: ReportCombustibleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportCombustibleController],
      providers: [ReportCombustibleService],
    }).compile();

    controller = module.get<ReportCombustibleController>(ReportCombustibleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
