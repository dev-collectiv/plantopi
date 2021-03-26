export class CreateTimetableDto {
  controllerId: number;
  startTime: Date;
  endTime: Date;

  constructor (controller: number, startTime: Date, endTime: Date) {
    this.controllerId = controller;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}