import { Test, TestingModule } from '@nestjs/testing';
import { ReportTrabajadorConduceService } from './report-trabajador-conduce.service';

describe('ReportTrabajadorConduceService', () => {
  let service: ReportTrabajadorConduceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportTrabajadorConduceService],
    }).compile();

    service = module.get<ReportTrabajadorConduceService>(ReportTrabajadorConduceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
