import { CronJob } from 'cron';
import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CronAction } from './entities/cron-action.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ActionService } from '../action/action.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { CreateCronDto } from './dto/create-cron.dto';

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

  async create(createCronDto: CreateCronDto): Promise<any> {
    // Need to stringify action when saving to db, but return non stringified object to front end.

    const initialAction = createCronDto.action;
    const stringifiedAction = JSON.stringify(createCronDto.action);

    createCronDto.action = stringifiedAction;
    const cronAction = await this.cronActionRepository.create(createCronDto);
    const savedCronAction = await this.cronActionRepository.save(cronAction);

    savedCronAction.action = initialAction;
    const { id } = savedCronAction;

    this.scheduleCronAction(id, createCronDto.time, initialAction);

    //the fact that cron action is a string gave an error on the FE
    //because the JSON parser cannot parse it for some apparent reason
    return savedCronAction;
  }

  //TODO - save action as JSON
  async findOne(id: string): Promise<CronAction | undefined> {
    const cronAction = await this.cronActionRepository.findOne(id);

    if (!cronAction) return undefined;

    const action = JSON.parse(cronAction.action);

    return { ...cronAction, action };
  }

  async findAll(): Promise<CronAction[]> {
    const cronActions = await this.cronActionRepository.find();

    return cronActions.map((cronAction) => {
      const action = JSON.parse(cronAction.action);
      return { ...cronAction, action };
    });
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

      this.scheduleCronAction(id, time, action);
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

  //TODO - fix action any
  private scheduleCronAction(id: string, time: string, action: any): void {
    const cb: CronCallbackType = () => this.actionService.publishActionToIOT(action);

    const job = new CronJob(time, () => {
      this.logger.log(`cron ${id} running`);
      cb();
    });

    this.schedulerRegistry.addCronJob(id, job);

    job.start();
  }
}
