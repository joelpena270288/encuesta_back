import { Test, TestingModule } from '@nestjs/testing';
import { Report06Service } from './report-06.service';

describe('Report06Service', () => {
  let service: Report06Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Report06Service],
    }).compile();

    service = module.get<Report06Service>(Report06Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
