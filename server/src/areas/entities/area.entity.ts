import { Sensor } from '../../sensors/entities/sensor.entity';
import { User } from '../../users/entities/user.entity';
import { Controller } from '../../controllers/entities/controller.entity';
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

  @OneToMany(() => Controller, controller => controller.area)
  controllers: Controller[];

  @Column({ default: true })
  isActive: boolean;

  constructor(id: number, user: User, sensors: Sensor[], controllers: Controller[], isActive: boolean) {
    this.id = id;
    this.user = user;
    this.sensors = sensors;
    this.controllers = controllers;
    this.isActive = isActive;
  }
}