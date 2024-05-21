import { Test, TestingModule } from '@nestjs/testing';
import { Report07Service } from './report-07.service';

describe('Report07Service', () => {
  let service: Report07Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Report07Service],
    }).compile();

    service = module.get<Report07Service>(Report07Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
