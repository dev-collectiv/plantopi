import { Module } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { CronService } from './cron.service';
import { CronsController } from './cron.controller';
import { ActionService } from 'src/action/action.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cron } from './entities/cron.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cron])],
  controllers: [CronsController],
  providers: [CronService, MqttService, ActionService]
})
export class CronModule {}
