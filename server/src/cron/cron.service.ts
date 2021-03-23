import { CronCommand, CronJob } from 'cron';
import { MqttService } from '../mqtt/mqtt.service';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

type CronCallbackType = (args?: any[]) => void;


@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private schedulerRegistry: SchedulerRegistry, private readonly mqttService: MqttService) {}

  getCronJob(name: string) {
    // console.log(job.lastDate());
    return this.schedulerRegistry.getCronJob(name);
  }

  deleteCronByName(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    return 200;
  }

  addCronJob(name: string, time: string, cb: CronCallbackType) {
    const job = new CronJob(time, () => {
      this.logger.log(`cron ${name} running`);
      cb();
    });
    this.schedulerRegistry.addCronJob(name, job);

    job.start();

    // return job;
  }

  getCrons() {
    return this.schedulerRegistry.getCronJobs();
  }
}

//TODO - find a way to relaunch all crons if the server restarts
