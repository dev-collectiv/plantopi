export class CreateSensorReadingDto {
  sensorId: string;
  timestamp: Date;
  value: string;

  constructor (sensorId: string, timestamp: Date, value: string) {
    this.sensorId = sensorId;
    this.timestamp = timestamp;
    this.value = value;
  }
}
