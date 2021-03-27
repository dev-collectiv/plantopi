import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  // ONLY FOR TESTING
  @Post('reading')
  createReading(@Body() createSensorReadingDto: CreateSensorReadingDto) {
    return this.sensorsService.createReading(createSensorReadingDto);
  }

  @Get('reading')
  findAllReadings() {
    return this.sensorsService.getReadings();
  }

  @Get('reading/:id')
  findReadingById(@Param('id') id: string) {
    return this.sensorsService.getReadingsById(id);
  }

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(+id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorsService.remove(+id);
  }
}
