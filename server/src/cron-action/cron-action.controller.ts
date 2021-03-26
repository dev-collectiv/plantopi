import { CronActionService } from './cron-action.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UpdateCronDto } from './dto/update-cron.dto';

@Controller('crons')
export class CronActionController {
  constructor(private readonly cronActionService: CronActionService) {}

  @Post()
  create(@Body() createCronDto: CreateCronDto) {
    const { time, action } = createCronDto;

    return this.cronActionService.create(time, action);
  }

  @Get()
  findAll() {
    return this.cronActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cronActionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCronDto: UpdateCronDto) {
    return this.cronActionService.update(id, updateCronDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cronActionService.remove(id);
  }
}
