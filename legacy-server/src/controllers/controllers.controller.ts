import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ControllersService } from './controllers.service';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';

@Controller('controllers')
export class ControllersController {
  constructor(private readonly controllersService: ControllersService) {}

  @Post()
  create(@Body() createControllerDto: CreateControllerDto) {
    return this.controllersService.create(createControllerDto);
  }

  @Get()
  findAll() {
    return this.controllersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.controllersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateControllerDto: UpdateControllerDto) {
    return this.controllersService.update(+id, updateControllerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controllersService.remove(+id);
  }
}
