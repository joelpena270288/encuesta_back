import { Test, TestingModule } from '@nestjs/testing';
import { ReportCombustibleService } from './report-combustible.service';

describe('ReportCombustibleService', () => {
  let service: ReportCombustibleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportCombustibleService],
    }).compile();

    service = module.get<ReportCombustibleService>(ReportCombustibleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
