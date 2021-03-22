import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AreasService {
  constructor(@InjectRepository(Area) private areaRepository: Repository<Area>) {}

  create(createAreaDto: CreateAreaDto) {
    return this.areaRepository.insert(createAreaDto);
  }

  findAll() {
    return this.areaRepository.find({relations: ['user']});
  }

  findOne(id: number): Promise<Area|undefined > {
    return this.areaRepository.findOne(id, {relations: ['user']});
  }

  update(id: number, updateUserDto: UpdateAreaDto): Promise<Area> {
    return this.areaRepository.save({id, ...updateUserDto});
  }

  async remove(id: number): Promise<void> {
    await this.areaRepository.delete(id);
  }
}
