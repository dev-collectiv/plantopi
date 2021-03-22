export class ActionDto {
  topic: string;
  payload: string;

  constructor (topic: string, payload: string) {
    this.topic = topic;
    this.payload = topic;
  }
}
