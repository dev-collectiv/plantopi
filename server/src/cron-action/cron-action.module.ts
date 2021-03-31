import { Module } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { CronActionService } from './cron-action.service';
import { CronActionController } from './cron-action.controller';
import { ActionService } from '../action/action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronAction } from './entities/cron-action.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TimetableModule } from '../timetable/timetable.module';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [TypeOrmModule.forFeature([CronAction]), SchedulerRegistry, TimetableModule],
  controllers: [CronActionController],
  providers: [CronActionService, MqttService, ActionService]
})
export class CronActionModule {}
