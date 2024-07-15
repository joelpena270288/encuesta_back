import { Test, TestingModule } from '@nestjs/testing';
import { ReporteEncuestaController } from './reporte-encuesta.controller';
import { ReporteEncuestaService } from './reporte-encuesta.service';

describe('ReporteEncuestaController', () => {
  let controller: ReporteEncuestaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReporteEncuestaController],
      providers: [ReporteEncuestaService],
    }).compile();

    controller = module.get<ReporteEncuestaController>(ReporteEncuestaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
