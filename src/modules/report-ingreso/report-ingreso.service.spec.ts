import { Test, TestingModule } from '@nestjs/testing';
import { ReportIngresoService } from './report-ingreso.service';

describe('ReportIngresoService', () => {
  let service: ReportIngresoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportIngresoService],
    }).compile();

    service = module.get<ReportIngresoService>(ReportIngresoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
