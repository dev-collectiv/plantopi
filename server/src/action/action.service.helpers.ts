import { MqttStatusDto, MqttSensorDto } from './dto/mqtt.dto';
import { CreateTimetableDto } from '../timetable/dto/create-timetable.dto';
import { CreateSensorReadingDto } from '../sensors/dto/create-sensor-reading.dto';

export function createDurationTracker (dbHandler: (timetable: CreateTimetableDto) => void, controllerId: string) {
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

export function createSensorReadingHandler (dbHandler: (sensorReadingDto: CreateSensorReadingDto) => void, sensorId: string, readingCountToRecord: number) {
  let counter = 0;

  return (data: MqttSensorDto) => {
    let { reading } = data;
    if (reading > 100) reading = 100;
    if (reading < 0) reading = 0;

    if (counter === readingCountToRecord) {
      counter = 0;
      return;
    }

    if (counter === 0) {
      dbHandler({
        sensorId: sensorId,
        timestamp: new Date(Date.now()),
        value: reading
      });
    }
    counter++;
  };
};