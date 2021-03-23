import { MqttRequestDto } from 'src/action/dto/mqtt.dto';

export class CreateCronDto {
  time!: string;
  action!: MqttRequestDto;
}
