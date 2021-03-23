import { MqttRequestDto } from 'src/action/dto/mqtt.dto';

export class CreateCronDto {
  time: string;
  controllerId: string;
  action: MqttRequestDto;

  constructor(controllerId: string, time: string, action: MqttRequestDto) {
    this.controllerId = controllerId;
    this.time = time;
    this.action = action;
  }
}
