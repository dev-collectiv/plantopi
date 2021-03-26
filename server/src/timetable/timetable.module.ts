import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './entities/timetable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timetable])],
  controllers: [TimetableController],
  providers: [TimetableService],
  exports: [TimetableService]
})
export class TimetableModule {}
