import { Sensor } from 'src/sensors/entities/sensor.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

// Area ties to users with ManyToOne, users tie to area with OneToMany

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.areas)
  user: User;

  @OneToMany(() => Sensor, sensor => sensor.area)
  sensors: Sensor[];

  @Column({ default: true })
  isActive: boolean;

  constructor(id: number, user: User, sensors: Sensor[], isActive: boolean) {
    this.id = id;
    this.user = user;
    this.sensors = sensors;
    this.isActive = isActive;
  }
}