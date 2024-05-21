import { Test, TestingModule } from '@nestjs/testing';
import { ReportGastoService } from './report-gasto.service';

describe('ReportGastoService', () => {
  let service: ReportGastoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportGastoService],
    }).compile();

    service = module.get<ReportGastoService>(ReportGastoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
