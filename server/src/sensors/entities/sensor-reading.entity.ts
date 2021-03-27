import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Sensor } from './sensor.entity';

@Entity()
export class SensorReading {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Sensor, sensor => sensor.sensorReadings  , {onDelete: 'CASCADE'})
  sensor: Sensor;

  @Column()
  sensorId: string;

  @Column({type: 'timestamp'})
  timestamp: Date;

  @Column()
  value: string;

  constructor(id: number, timestamp: Date, value: string, sensor: Sensor, sensorId: string) {
    this.id = id;
    this.sensor = sensor;
    this.sensorId = sensorId;
    this.timestamp = timestamp;
    this.value = value;
  }
}