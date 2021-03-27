import { Area } from '../../areas/entities/area.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { SensorReading } from './sensor-reading.entity';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Area, area => area.sensors, {onDelete: 'CASCADE'})
  area: Area;

  @OneToMany(() => SensorReading, sensorReading => sensorReading.sensor)
  sensorReadings: SensorReading[];

  @Column()
  type: string;

  @Column({ default: true })
  isActive: boolean;

  constructor(id: number, area: Area, type: string, sensorReadings: SensorReading[], isActive: boolean) {
    this.id = id;
    this.area = area;
    this.type = type;
    this.isActive = isActive;
    this.sensorReadings = sensorReadings;
  }
}