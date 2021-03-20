import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';

@Module({
  controllers: [ActionController],
  providers: [ActionService]
})
export class ActionModule {}
