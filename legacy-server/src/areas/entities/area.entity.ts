import { Sensor } from '../../sensors/entities/sensor.entity';
import { User } from '../../users/entities/user.entity';
import { Controller } from '../../controllers/entities/controller.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.areas, {onDelete: 'CASCADE'})
  user: User;

  @OneToMany(() => Sensor, sensor => sensor.area)
  sensors: Sensor[];

  @OneToMany(() => Controller, controller => controller.area)
  controllers: Controller[];

  @Column({ default: true })
  isActive: boolean;

  @Column()
  name: string;

  @Column({ default: '41.3851' }) // Barcelona's lat by default
  latitude: string;

  @Column({ default: '2.1734' }) // Barcelona's lon by default
  longitude: string;

  constructor(id: number, name: string, user: User, sensors: Sensor[], controllers: Controller[], longitude: string, latitude: string, isActive: boolean) {
    this.id = id;
    this.user = user;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.sensors = sensors;
    this.controllers = controllers;
    this.isActive = isActive;
  }
}