import { MqttRequestDto } from 'src/action/dto/mqtt.dto';

export class CreateCronDto {
  name!: string;
  time!: string;
  task!: MqttRequestDto;

  //TODO - decide which approach to take (if ! or constructor)
  // constructor(name: string, time: string, task: string) {
  //   this.name = name;
  //   this.time = time;
  //   this.task = task;
  // }
}
