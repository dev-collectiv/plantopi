import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionGateway } from './action.gateway';
import { ActionController } from './action.controller';
import { MqttService } from '../mqtt/mqtt.service';
import { TimetableModule } from '../timetable/timetable.module';

@Module({
  controllers: [ActionController],
  providers: [ActionService, ActionGateway, MqttService],
  imports: [TimetableModule]
})
export class ActionModule {}
