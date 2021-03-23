import { Module } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { CronService } from './cron.service';
import { CronsController } from './cron.controller';

@Module({
  controllers: [CronsController],
  providers: [CronService, MqttService]
})
export class CronModule {}
