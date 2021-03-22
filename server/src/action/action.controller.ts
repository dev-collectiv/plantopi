import { Controller, Post, Body } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionDto } from './dto/action.dto';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  create(@Body() ActionDto: ActionDto) {
    // POST REQ HANDLING GOES HERE (THOUGH MAY NOT BE USED WITH SOCKETS)
    return 'Post req received in one piece, with topic: ' + ActionDto.topic;
  }
}
