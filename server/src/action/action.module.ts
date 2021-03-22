import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionGateway } from './action.gateway';
import { ActionController } from './action.controller';

@Module({
  controllers: [ActionController],
  providers: [ActionService, ActionGateway]
})
export class ActionModule {}
