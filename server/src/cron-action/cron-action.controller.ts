import { CronActionService } from './cron-action.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ActionService } from 'src/action/action.service';

@Controller('crons')
export class CronActionController {
  constructor(
    private readonly cronService: CronActionService,
    private readonly actionService: ActionService
  ) {}

  @Post()
  create(@Body() createCronDto: CreateCronDto) {
    const { time, action } = createCronDto;
    const cb = () => this.actionService.publishActionToIOT(action);

    this.cronService.create(time, cb);

    //TODO - return db object
  }

  /*
  TEST REQUEST
  xxx:3001/cron
  {
    "name": "test",
    "time": "6 * * * * *",
    "task": {
      "id": "pump2",
      "action": "on",
      "duration": 3
    }
  }
  */

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
