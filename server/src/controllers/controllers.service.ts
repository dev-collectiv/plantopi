import { Injectable } from '@nestjs/common';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { Repository } from 'typeorm';
import { Controller } from './entities/controller.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ControllersService {
  constructor(@InjectRepository(Controller) private controllerRepository: Repository<Controller>) {}

  create(createControllerDto: CreateControllerDto) {
    const newController =  this.controllerRepository.create(createControllerDto);
    return this.controllerRepository.save(newController);
  }

  findAll() {
    return this.controllerRepository.find({relations: ['area']});
  }

  findOne(id: number): Promise<Controller|undefined > {
    return this.controllerRepository.findOne(id, {relations: ['area']});
  }

  update(id: number, updateControllerDto: UpdateControllerDto): Promise<Controller> {
    return this.controllerRepository.save({id, ...updateControllerDto});
  }

  async remove(id: number): Promise<void> {
    await this.controllerRepository.delete(id);
  }
}
