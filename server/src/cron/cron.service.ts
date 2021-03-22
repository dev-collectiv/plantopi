import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';

@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  getCronJob(name: string) {
    // console.log(job.lastDate());
    return this.schedulerRegistry.getCronJob(name);
  }

  deleteCronByName(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    return 200;
  }

  addCronJob(name: string, time: string, cb: CronCommand) {
    const job = new CronJob(time, cb);

    this.schedulerRegistry.addCronJob(name, job);

    job.start();
  }

  getCrons() {
    return this.schedulerRegistry.getCronJobs();
  }
}

//TODO - find a way to relaunch all crons if the server restarts
