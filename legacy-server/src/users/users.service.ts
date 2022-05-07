import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({relations: ['areas', 'areas.sensors', 'areas.controllers']});
  }

  findOne(id: number): Promise<User|undefined > {
    return this.userRepository.findOne(id, {relations: ['areas', 'areas.sensors', 'areas.controllers']});
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.save({id, ...updateUserDto});
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
