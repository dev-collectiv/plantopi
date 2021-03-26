import { Injectable } from '@nestjs/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TimetableService {
  constructor(@InjectRepository(Timetable) private timetableRepository: Repository<Timetable>) {}

  create = (createTimetableDto: CreateTimetableDto) => {
    return this.timetableRepository.insert(createTimetableDto);
  }

  findAll() {
    return this.timetableRepository.find({});
  }

  findOne(id: number) {
    return this.timetableRepository.findOne(id);
  }

  async remove(id: number) {
    await this.timetableRepository.delete(id);
  }
}
