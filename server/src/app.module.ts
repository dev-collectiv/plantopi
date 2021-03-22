import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionModule } from './action/action.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Area } from './areas/entities/area.entity';
import { Sensor } from './sensors/entities/sensor.entity';
import { UsersModule } from './users/users.module';
import { AreasModule } from './areas/areas.module';
import { SensorsModule } from './sensors/sensors.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [User, Area, Sensor],
      synchronize: true,
    }),
    ActionModule,
    UsersModule,
    AreasModule,
    SensorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
