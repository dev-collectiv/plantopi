import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import fetch from 'node-fetch';


@Injectable()
export class AreasService {
  constructor(@InjectRepository(Area) private areaRepository: Repository<Area>) {}

  create(createAreaDto: CreateAreaDto) {
    return this.areaRepository.insert(createAreaDto);
  }

  findAll() {
    return this.areaRepository.find({relations: ['user', 'sensors', 'controllers']});
  }

  findOne(id: number): Promise<Area|undefined > {
    return this.areaRepository.findOne(id, {relations: ['user', 'sensors', 'controllers']});
  }

  update(id: number, updateUserDto: UpdateAreaDto): Promise<Area> {
    return this.areaRepository.save({id, ...updateUserDto});
  }

  fetchWeather(latitude: string, longitude: string) {
    const apiKey = process.env.WEATHER_API_KEY;

    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then(res => res.json());
  }

  async remove(id: number): Promise<void> {
    await this.areaRepository.delete(id);
  }
}
