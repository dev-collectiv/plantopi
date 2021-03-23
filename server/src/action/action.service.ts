import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { Socket } from 'socket.io';
import { MqttRequestDto } from './dto/mqtt.dto';

@Injectable()
export class ActionService {

  constructor (public mqttService: MqttService) {
    mqttService.subscribeToTopic('status');
    this.listenToTopic('status');
    console.log('Subscribed to status');
  }

  publishActionToIOT (message: string) {
    const action = (message == '0') ? 'off' : 'on';

    const messageToSend: MqttRequestDto = {
      action: action,
      id: 'pump1',
      duration: parseInt(message)
    };

    this.mqttService.publishToTopic('action', messageToSend);
  }

  listenToTopic (mqttTopic: string) {
    this.mqttService.mqttClient.on('message', (topic, payload, packet) => {
      if (topic === mqttTopic) {
        console.log(topic);
        console.log(JSON.parse(payload.toString()));
      }
    });
  }

  giveStatusUpdatesTo (client: Socket) {
    let watering = true;
    let previousStatus: null|'off' = null;
    const statusUpdateHandler = (topic: string, payload: Buffer, _: any) => {
      if (topic === 'status' && watering) {
        const data = JSON.parse(payload.toString());

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

    this.mqttService.mqttClient.on('message', statusUpdateHandler);
  }
}
