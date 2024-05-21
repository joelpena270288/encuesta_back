import { Test, TestingModule } from '@nestjs/testing';
import { Report07Controller } from './report-07.controller';
import { Report07Service } from './report-07.service';

describe('Report07Controller', () => {
  let controller: Report07Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Report07Controller],
      providers: [Report07Service],
    }).compile();

    controller = module.get<Report07Controller>(Report07Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
