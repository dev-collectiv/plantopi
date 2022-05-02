export class CreateSensorReadingDto {
  sensorId: string;
  timestamp: Date;
  value: number;

  constructor (sensorId: string, timestamp: Date, value: number) {
    this.sensorId = sensorId;
    this.timestamp = timestamp;
    this.value = value;
  }
}
