import { Test, TestingModule } from '@nestjs/testing';
import { CronActionService } from './cron-action.service';

describe('CronService', () => {
  let service: CronActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronActionService]
    }).compile();

    service = module.get<CronActionService>(CronActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
