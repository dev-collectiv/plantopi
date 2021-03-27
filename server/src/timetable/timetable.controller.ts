import { Controller, Get, Param, Delete, NotFoundException } from '@nestjs/common';
import { TimetableService } from './timetable.service';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  //TODO: Add option to get by controller id, and another one that calculates daily duration from timestamps

  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  @Get('durations') // GET DURATIONS OF ALL - TODO: IMPLEMENT GET DURATION BY CONTROLLER ID
  async getDurations() {
    const timetable = await this.timetableService.findAll();
    if (!timetable) throw new NotFoundException();

    const durationTable = this.timetableService.createDurationTable(timetable);
    const durationPivot = this.timetableService.pivotDurations(durationTable);
    return durationPivot;
  };

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.timetableService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timetableService.remove(+id);
  }
}
