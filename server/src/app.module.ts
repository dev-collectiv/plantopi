import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionModule } from './action/action.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AreasModule } from './areas/areas.module';
import { SensorsModule } from './sensors/sensors.module';
import { ControllersModule } from './controllers/controllers.module';
import { CronActionModule } from './cron-action/cron-action.module';
import { MqttService } from './mqtt/mqtt.service';
import { TimetableModule } from './timetable/timetable.module';
import * as dotenv from 'dotenv';

dotenv.config();
const dbName = process.env.NODE_ENV === 'test' ? 'test' : 'development';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => await getConnectionOptions(dbName)
    }),
    ActionModule,
    CronActionModule,
    UsersModule,
    AreasModule,
    SensorsModule,
    ControllersModule,
    ScheduleModule.forRoot(),
    TimetableModule
  ],
  controllers: [AppController],
  providers: [AppService, MqttService]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
