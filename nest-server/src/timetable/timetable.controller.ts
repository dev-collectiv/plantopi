import { Controller, Get, Param, Delete, NotFoundException } from '@nestjs/common';
import { TimetableService } from './timetable.service';

@Controller('timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  @Get('durations')
  async getDurations() {
    const timetable = await this.timetableService.findAll();
    if (!timetable) throw new NotFoundException();

    const durationTable = this.timetableService.createDurationTable(timetable);
    const durationPivot = this.timetableService.pivotDurations(durationTable);
    return durationPivot;
  };

  @Get('durations/:id') // Get filtered by controller id
  async getDurationsById(@Param('id') id: string) {
    const allDurations = await this.getDurations();
    return allDurations[id];
  };

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timetableService.remove(+id);
  }
}
