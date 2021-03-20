import { Controller, Post, Body } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionDto } from './dto/action.dto';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  // @Post()
  // create(@Body() ActionDto: ActionDto) {

  // }

}
