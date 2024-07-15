import { Test, TestingModule } from '@nestjs/testing';
import { ReporteEncuestaService } from './reporte-encuesta.service';

describe('ReporteEncuestaService', () => {
  let service: ReporteEncuestaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReporteEncuestaService],
    }).compile();

    service = module.get<ReporteEncuestaService>(ReporteEncuestaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
