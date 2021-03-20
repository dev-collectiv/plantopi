import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionModule } from './action/action.module';

@Module({
  imports: [ActionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
