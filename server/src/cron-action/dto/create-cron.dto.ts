export class CreateCronDto {
  time: string;
  controllerId: string;
  action: string;

  constructor(controllerId: string, time: string, action: string) {
    this.controllerId = controllerId;
    this.time = time;
    this.action = action;
  }
}
