import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionGateway } from './action.gateway';
import { ActionController } from './action.controller';
import { TimetableModule } from '../timetable/timetable.module';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  controllers: [ActionController],
  providers: [ActionService, ActionGateway],
  imports: [TimetableModule, MqttModule],
  exports: [ActionService]
})
export class ActionModule {}
