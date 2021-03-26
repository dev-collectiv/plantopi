import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { Socket } from 'socket.io';
import { MqttRequestDto, MqttStatusDto } from './dto/mqtt.dto';
import { WsException } from '@nestjs/websockets';
import { TimetableService } from '../timetable/timetable.service';
import { createDurationTracker } from './action.service.helpers';

const trackedController = 16; // As we don't track separate controllers yet time tracking fn always recors time under this controller id. To be assigned to relevant controllers as they become available.

@Injectable()
export class ActionService {
  constructor(public mqttService: MqttService, private timetableService: TimetableService) {
    mqttService.subscribeToTopic('status');

    const durationTracker = createDurationTracker(this.timetableService.create, trackedController);
    this.onMqttTopic('status', data => durationTracker(data));

    console.log('Subscribed to status');
  }

  publishActionToIOT(action: MqttRequestDto) {
    this.mqttService.publishToTopic('action', action);
  }

  onMqttTopic(mqttTopic: string, handler: (data: MqttStatusDto) => any) {
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

  giveStatusUpdatesTo(client: Socket, payload: MqttRequestDto) {
    let watering = true;
    let previousStatus: null | 'off' = null;

    //cb takes (topic, payload, packet)
    const statusUpdateHandler = (topic: string, payload: Buffer) => {
      if (topic === 'status' && watering) {

        let data;

        try {
          data = JSON.parse(payload.toString());
        } catch (err) {
          console.log('Status from Mqtt could not be relayed to client. Verify that the broker is publishing a JSON.');
          return;
        }
        // This part above can be refactored into onMqttTopic later

        // There is a chance that the server may still receive the previous status of IoT after the client makes a request,
        // so we check and stop sending feedback only if we receive 'off' status twice in a row.
        if (data.status === 'off' && previousStatus === 'off') {
          watering = false;
          this.mqttService.mqttClient.removeListener('message', statusUpdateHandler);
          return;
        }

        client.emit('action', `Status update: ${data.id} is ${data.status}`);
        if (data.status === 'off') previousStatus = 'off';
      }
    };

    if (payload.action === 'off') {
      this.mqttService.mqttClient.removeListener('message', statusUpdateHandler);
    } else {
      this.mqttService.mqttClient.on('message', statusUpdateHandler);
    }
  }
}
