import { CronJob } from 'cron';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronAction } from './entities/cronAction.entity';
import { Repository } from 'typeorm';

type CronCallbackType = (args?: any[]) => void;

@Injectable()
export class CronActionService {
  private readonly logger = new Logger(CronActionService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(CronAction) private cronActionRepository: Repository<CronAction>
  ) {}

  getCronAction(name: string) {
    // console.log(job.lastDate());
    return this.schedulerRegistry.getCronJob(name);
  }

  deleteCronActionByName(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    return 200;
  }

  async create(time: string, cb: CronCallbackType) {
    const cronAction = await this.cronActionRepository.create({ time, cb: JSON.stringify(cb) });
    this.cronActionRepository.save(cronAction);
    const { id } = cronAction;
    this.scheduleCronAction(id, time, cb);
    return cronAction;
  }

  scheduleCronAction(id: string, time: string, cb: CronCallbackType) {
    const job = new CronJob(time, () => {
      this.logger.log(`cron ${id} running`);
      cb();
    });

    this.schedulerRegistry.addCronJob(id, job);

    job.start();
  }

  getCronActions() {
    return this.schedulerRegistry.getCronJobs();
  }
}

//TODO - find a way to relaunch all crons if the server restarts
