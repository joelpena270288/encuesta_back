import { Test, TestingModule } from '@nestjs/testing';
import { ReportVentasService } from './report-ventas.service';

describe('ReportVentasService', () => {
  let service: ReportVentasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportVentasService],
    }).compile();

    service = module.get<ReportVentasService>(ReportVentasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
