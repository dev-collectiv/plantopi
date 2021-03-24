import { CronJob } from 'cron';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronAction } from './entities/cron-action.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { MqttRequestDto } from 'src/action/dto/mqtt.dto';
import { ActionService } from 'src/action/action.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';

type CronCallbackType = (args?: any[]) => void;

@Injectable()
export class CronActionService {
  private readonly logger = new Logger(CronActionService.name);

  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private readonly actionService: ActionService,
    @InjectRepository(CronAction) private cronActionRepository: Repository<CronAction>
  ) {
    this.setInitialCronActions();
  }

  async create(time: string, action: MqttRequestDto): Promise<InsertResult> {
    const stringifiedAction = JSON.stringify(action);
    const cronAction = await this.cronActionRepository.insert({ time, action: stringifiedAction });
    const { id } = cronAction.identifiers[0];

    this.scheduleCronAction(id, time, action);

    return cronAction;
  }

  findOne(id: string): Promise<CronAction | undefined> {
    return this.cronActionRepository.findOne(id);
  }

  findAll(): Promise<CronAction[]> {
    return this.cronActionRepository.find({});
  }

  update(id: string, updateCronDto: UpdateCronDto): Promise<CronAction> {
    const { action, time, isActive } = updateCronDto;
    const stringifiedAction = JSON.stringify(action);

    //delete scheduledCronAction and create a new one
    this.deleteScheduledCronAction(id);
    if (isActive) this.scheduleCronAction(id, time, action);

    return this.cronActionRepository.save({ id, ...updateCronDto, action: stringifiedAction });
  }

  remove(id: string): Promise<DeleteResult> {
    this.deleteScheduledCronAction(id);
    return this.cronActionRepository.delete(id);
  }

  //if server restarts, this method reschedule the saved cronActions
  private async setInitialCronActions(): Promise<void> {
    const cronActions = await this.findAll();

    cronActions.forEach((cronAction) => {
      if (!cronAction.isActive) return;

      const { id, time, action } = cronAction;
      const parsedAction = JSON.parse(action);

      this.scheduleCronAction(id, time, parsedAction);
    });
  }

  //Will keep this commented since it might be useful in the future
  // private getScheduledCronJob(id: string): CronJob {
  //   return this.schedulerRegistry.getCronJob(id);
  // }

  private deleteScheduledCronAction(id: string): void {
    try {
      this.schedulerRegistry.deleteCronJob(id);
    } catch (error) {
      console.log('The fetched resolver does not exist');
    }
  }

  private scheduleCronAction(id: string, time: string, action: MqttRequestDto): void {
    const cb: CronCallbackType = () => this.actionService.publishActionToIOT(action);

    const job = new CronJob(time, () => {
      this.logger.log(`cron ${id} running`);
      cb();
    });

    this.schedulerRegistry.addCronJob(id, job);

    job.start();
  }
}
