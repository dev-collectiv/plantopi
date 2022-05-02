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
    const newSensor = this.sensorRepository.create(createSensorDto);
    return this.sensorRepository.save(newSensor);
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

  createReading = async (createSensorReadingDto: CreateSensorReadingDto) => {
    try {
      await this.sensorReadingRepository.insert(createSensorReadingDto);
    } catch (err) {
      const sensor = await this.findOne (+createSensorReadingDto.sensorId);
      let errorMsg = 'Sensor reading could not be saved to Db.';
      if (!sensor) errorMsg += ` Sensor ${createSensorReadingDto.sensorId} does not exist.`;
      console.log(errorMsg);
    }
  }

  getReadings = () => {
    return this.sensorReadingRepository.find({});
  }

  getReadingsById = (id: string) => {
    return this.sensorReadingRepository.find({sensorId: id});
  }
}
