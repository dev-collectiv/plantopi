import { MqttStatusDto, MqttSensorDto } from './dto/mqtt.dto';
import { CreateTimetableDto } from '../timetable/dto/create-timetable.dto';
import { CreateSensorReadingDto } from '../sensors/dto/create-sensor-reading.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

export function createDurationTracker (dbHandler: (timetable: CreateTimetableDto) => void) {
  const controllerId = '1';
  let previousStatus: null | 'on' | 'off' = null;
  let startTime: null | Date = null;
  let endTime: null | Date = null;

  return (data: MqttStatusDto) => {
    const status = data.status;

    switch (previousStatus) {
    case null:
      previousStatus = status;
      break;
    case 'off':
      if (status === 'on') {
        startTime = new Date(Date.now());
        previousStatus = status;
      }
      break;
    case 'on':
      if (status === 'off') {
        endTime = new Date(Date.now());
        previousStatus = status;
      }
      break;
    }

    if (startTime && endTime) {

      dbHandler({
        startTime,
        endTime,
        controllerId: controllerId
      });

      startTime = null;
      endTime = null;
    }
  };
}

export function createSensorReadingHandler (dbHandler: (sensorReadingDto: CreateSensorReadingDto) => void, sensorEventEmitter: EventEmitter2) {
  let counter = 0;
  const sensorId = '1';
  const readingCountToRecord = 10;

  return (data: MqttSensorDto) => {
    let { reading } = data;

    if (reading === -1) return;
    if (reading > 100) reading = 100;
    if (reading < 0) reading = 0;


    const sensorData: CreateSensorReadingDto = {
      sensorId: data.id,
      timestamp: new Date(Date.now()),
      value: reading
    };

    sensorEventEmitter.emit('readingReceived', sensorData);

    if (counter === readingCountToRecord) {
      counter = 0;
      return;
    }

    if (counter === 0) {
      sensorData.sensorId = sensorId;
      dbHandler(sensorData);
    }
    counter++;
  };
};