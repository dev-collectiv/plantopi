import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionModule } from './action/action.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AreasModule } from './areas/areas.module';
import { SensorsModule } from './sensors/sensors.module';
import { ControllersModule } from './controllers/controllers.module';
import { CronActionModule } from './cron-action/cron-action.module';
import { MqttService } from './mqtt/mqtt.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ActionModule,
    CronActionModule,
    UsersModule,
    AreasModule,
    SensorsModule,
    ControllersModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, MqttService]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
