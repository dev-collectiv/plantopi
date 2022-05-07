import { Module } from '@nestjs/common';
import { ControllersService } from './controllers.service';
import { ControllersController } from './controllers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controller } from './entities/controller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Controller])],
  controllers: [ControllersController],
  providers: [ControllersService]
})
export class ControllersModule {}
