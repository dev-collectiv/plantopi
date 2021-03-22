import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionModule } from './action/action.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron/cron.service';

@Module({
  imports: [ActionModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, CronService]
})
export class AppModule {}
