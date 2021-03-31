import { Module } from '@nestjs/common';
import { CronActionService } from './cron-action.service';
import { CronActionController } from './cron-action.controller';
import { ActionModule } from '../action/action.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronAction } from './entities/cron-action.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TimetableModule } from '../timetable/timetable.module';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [TypeOrmModule.forFeature([CronAction]), MqttModule, SchedulerRegistry, TimetableModule, ActionModule],
  controllers: [CronActionController],
  providers: [CronActionService]
})
export class CronActionModule {}
