import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { Socket } from 'socket.io';
import { MqttRequestDto } from './dto/mqtt.dto';

@Injectable()
export class ActionService {

  constructor (public mqttService: MqttService) {
    mqttService.subscribeToTopic('action');
    mqttService.subscribeToTopic('status');
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

  giveStatusUpdatesTo (client: Socket) {
    this.mqttService.mqttClient.on('status', (data: any) => {
      console.log(data);
      client.emit(`Status update: ${data}`);
    }); // TODO: SWAP ANY WITH RELEVANT DTO
  }
}
