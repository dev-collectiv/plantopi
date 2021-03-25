import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { Socket } from 'socket.io';
import { MqttRequestDto, MqttStatusDto } from './dto/mqtt.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ActionService {
  constructor(public mqttService: MqttService) {
    mqttService.subscribeToTopic('status');

    const durationTracker = this.createDurationTracker();
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
        throw new WsException ('Status from Mqtt could not be relayed to client. Verify that the broker is publishing a JSON.');
      }

      handler(data);
    });
  }

  createDurationTracker () {
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
        const durationInMs = endTime.valueOf() - startTime.valueOf();

        // UPDATE DURATION IN DB

        startTime = null;
        endTime = null;
      }
    };
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
          throw new WsException ('Status from Mqtt could not be relayed to client. Verify that the broker is publishing a JSON.');
        }

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
