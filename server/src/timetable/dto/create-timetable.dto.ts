export class CreateTimetableDto {
  controllerId: string;
  startTime: Date;
  endTime: Date;

  constructor (controllerId: string, startTime: Date, endTime: Date) {
    this.controllerId = controllerId;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export type DurationEntry = {controllerId: string, date: string, duration: number};