import { Test, TestingModule } from '@nestjs/testing';
import { Report06Controller } from './report-06.controller';
import { Report06Service } from './report-06.service';

describe('Report06Controller', () => {
  let controller: Report06Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Report06Controller],
      providers: [Report06Service],
    }).compile();

    controller = module.get<Report06Controller>(Report06Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
