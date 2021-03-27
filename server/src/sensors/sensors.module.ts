import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorReading } from './entities/sensor-reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, SensorReading])],
  controllers: [SensorsController],
  providers: [SensorsService],
  exports: [SensorsService]
})
export class SensorsModule {}
