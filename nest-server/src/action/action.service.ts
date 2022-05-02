import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { MqttRequestDto, MqttStatusDto } from './dto/mqtt.dto';
import { TimetableService } from '../timetable/timetable.service';
import { createDurationTracker, createSensorReadingHandler } from './action.service.helpers';
import { SensorsService } from '../sensors/sensors.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ActionService {
  constructor(public mqttService: MqttService, private timetableService: TimetableService, private sensorService: SensorsService, public sensorEventEmitter: EventEmitter2, public statusEventEmitter: EventEmitter2) {

    mqttService.subscribeToTopic('status');
    mqttService.subscribeToTopic('sensors');
    const durationTracker = createDurationTracker(this.timetableService.create);
    const sensorReadingHandler = createSensorReadingHandler(this.sensorService.createReading, sensorEventEmitter);

    this.onMqttTopic('status', (data: MqttStatusDto) => durationTracker(data));
    this.onMqttTopic('status', (data: MqttStatusDto) => statusEventEmitter.emit('status', data));
    this.onMqttTopic('sensors', data => sensorReadingHandler(data));

    console.log('Subscribed to status');
  }

  publishActionToIOT(action: MqttRequestDto) {
    this.mqttService.publishToTopic('action', action);
  }

  onMqttTopic(mqttTopic: string, handler: (data: any) => any) {
    this.mqttService.mqttClient.on('message', (topic, payload) => {
      if (topic !== mqttTopic) return;

      let data: MqttStatusDto;
      try {
        data = JSON.parse(payload.toString());
      } catch (err) {
        console.log('Status from Mqtt could not be relayed to client. Verify that the broker is publishing a JSON.');
        return;
      }

      handler(data);
    });
  }
}
