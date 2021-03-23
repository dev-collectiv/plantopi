import { CronCommand, CronJob } from 'cron';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

type CronCallbackType = (args?: any[]) => void;


@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  getCronJob(name: string) {
    // console.log(job.lastDate());
    return this.schedulerRegistry.getCronJob(name);
  }

  deleteCronByName(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    return 200;
  }

  addCronJob(id: string, time: string, cb: CronCallbackType) {
    const job = new CronJob(time, () => {
      this.logger.log(`cron ${id} running`);
      cb();
    });

    this.schedulerRegistry.addCronJob(id, job);

    job.start();
  }

  getCrons() {
    return this.schedulerRegistry.getCronJobs();
  }
}

//TODO - find a way to relaunch all crons if the server restarts
