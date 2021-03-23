import { MqttRequestDto } from 'src/action/dto/mqtt.dto';

export class CreateCronDto {
  id!: string;
  time!: string;
  action!: MqttRequestDto;
}
