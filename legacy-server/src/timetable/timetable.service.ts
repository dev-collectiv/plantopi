import { Injectable } from '@nestjs/common';
import { CreateTimetableDto, DurationEntry } from './dto/create-timetable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimetableService {
  constructor(@InjectRepository(Timetable) private timetableRepository: Repository<Timetable>) {
  }

  create = async (createTimetableDto: CreateTimetableDto) => {
    try {
      const newEntry = this.timetableRepository.create(createTimetableDto);
      const savedEntry = await this.timetableRepository.save(newEntry);
      console.log('Time entry created.');
      return savedEntry;
    } catch (err) {
      console.log('Time entry could not be created - check if associated controller exists in the database.');
    }
  }

  findAll() {
    return this.timetableRepository.find({});
  }

  findOne(id: number) {
    return this.timetableRepository.findOne(id);
  }

  createDurationTable(timetable: CreateTimetableDto[]): DurationEntry[] {
    const durationTable = timetable.map((timeEntry) => {
      const duration = timeEntry.endTime.valueOf() - timeEntry.startTime.valueOf();
      const date = timeEntry.startTime.toISOString().split('T')[0];
      return {controllerId: timeEntry.controllerId.toString(), date, duration};
    });

    return durationTable;
  };

  pivotDurations(durationTable: DurationEntry[]) {
    type PivotTable = {[index: string]: {[index: string]: number}};

    const pivotTable: PivotTable = {};

    durationTable.forEach(entry => {
      if (!pivotTable[entry.controllerId]) {
        pivotTable[entry.controllerId] = {[entry.date]: entry.duration};
      } else {
        pivotTable[entry.controllerId][entry.date] += entry.duration;
      }
    });

    return pivotTable;
  };

  async remove(id: number) {
    await this.timetableRepository.delete(id);
  }
}
