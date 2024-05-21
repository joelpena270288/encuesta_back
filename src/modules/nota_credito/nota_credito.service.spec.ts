import { Test, TestingModule } from '@nestjs/testing';
import { NotaCreditoService } from './nota_credito.service';

describe('NotaCreditoService', () => {
  let service: NotaCreditoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotaCreditoService],
    }).compile();

    service = module.get<NotaCreditoService>(NotaCreditoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
