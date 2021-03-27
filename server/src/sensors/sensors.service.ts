import { Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Repository } from 'typeorm';
import { Sensor } from './entities/sensor.entity';
import { SensorReading } from './entities/sensor-reading.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class SensorsService {
  constructor(@InjectRepository(Sensor) private sensorRepository: Repository<Sensor>, @InjectRepository(SensorReading) private sensorReadingRepository: Repository<SensorReading>) {}

  create(createSensorDto: CreateSensorDto) {
    return this.sensorRepository.insert(createSensorDto);
  }

  findAll() {
    return this.sensorRepository.find({relations: ['area']});
  }

  findOne(id: number): Promise<Sensor|undefined > {
    return this.sensorRepository.findOne(id, {relations: ['area']});
  }

  update(id: number, updateSensorDto: UpdateSensorDto): Promise<Sensor> {
    return this.sensorRepository.save({id, ...updateSensorDto});
  }

  async remove(id: number): Promise<void> {
    await this.sensorRepository.delete(id);
  }

  createReading (createSensorReadingDto: CreateSensorReadingDto) {
    return this.sensorReadingRepository.insert(createSensorReadingDto);
  }

  getReadings() {
    return this.sensorReadingRepository.find({});
  }

  getReadingsById(id: string) {
    return this.sensorReadingRepository.find({sensorId: id});
  }
}
