import { MqttStatusDto } from './dto/mqtt.dto';
import { CreateTimetableDto } from '../timetable/dto/create-timetable.dto';

export function createDurationTracker (dbHandler: (timetable: CreateTimetableDto) => void) {
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
      }
      break;
    }

    if (startTime && endTime) {

      // TODO: HANDLE IF START & END DAYS ARE DIFFERENT
      dbHandler({
        startTime,
        endTime,
        controllerId: 1
      });

      startTime = null;
      endTime = null;
    }
  };
}