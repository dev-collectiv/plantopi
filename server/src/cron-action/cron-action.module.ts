import { Module } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { CronActionService } from './cron-action.service';
import { CronActionController } from './cron-action.controller';
import { ActionService } from 'src/action/action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronAction } from './entities/cronAction.entity';
import { SchedulerRegistry } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([CronAction]), SchedulerRegistry],
  controllers: [CronActionController],
  providers: [CronActionService, MqttService, ActionService]
})
export class CronActionModule {}
