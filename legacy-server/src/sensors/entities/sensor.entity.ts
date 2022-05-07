import { Area } from '../../areas/entities/area.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, OneToMany } from 'typeorm';
import { SensorReading } from './sensor-reading.entity';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Area, area => area.sensors, {onDelete: 'CASCADE'})
  area: Area;

  @Column()
  areaId: string;

  @OneToMany(() => SensorReading, sensorReading => sensorReading.sensor)
  sensorReadings: SensorReading[];

  @Column()
  type: string;

  @Column()
  iotId?: string;

  @BeforeInsert()
  generateIotId () {
    this.iotId = 'sensor' + this.areaId;
  }

  @Column({ default: true })
  isActive: boolean;

  constructor(id: number, area: Area, areaId: string, type: string, sensorReadings: SensorReading[], isActive: boolean) {
    this.id = id;
    this.area = area;
    this.areaId = areaId;
    this.type = type;
    this.isActive = isActive;
    this.sensorReadings = sensorReadings;
  }
}