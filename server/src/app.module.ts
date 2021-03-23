import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionModule } from './action/action.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Area } from './areas/entities/area.entity';
import { Sensor } from './sensors/entities/sensor.entity';
import { UsersModule } from './users/users.module';
import { AreasModule } from './areas/areas.module';
import { SensorsModule } from './sensors/sensors.module';
import { CronModule } from './cron/cron.module';
import { MqttService } from './mqtt/mqtt.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'localhost',
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User, Area, Sensor],
      synchronize: true
    }),
    ActionModule,
    CronModule,
    UsersModule,
    AreasModule,
    SensorsModule,
    ActionModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService, CronService, MqttService]
})
export class AppModule {
  constructor(private connection: Connection) {}
}
