import { Injectable } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';
import { MqttDto } from './dto/mqtt.dto';

@Injectable()
export class ActionService {

  constructor (private mqttService: MqttService) {
    mqttService.subscribeToTopic('action'); // CURRENTLY SUBSCRIBES TO "ACTION" TOPIC UPON REQUEST FROM FRONT END - LATER ON MAY INCLUDE IN MQTT INIT INSTEAD
  }

  publishActionToIOT (message: string) {
    const action = (message == '0') ? 'off' : 'on';

    const messageToSend: MqttDto = {
      action: action,
      id: 'pump1',
      duration: parseInt(message)
    };

    this.mqttService.publishToTopic('action', messageToSend);
  }
}
