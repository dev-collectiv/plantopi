import { Controller } from '../../controllers/entities/controller.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Controller, controller => controller.timetables  , {onDelete: 'CASCADE'})
  controller: Controller;

  @Column()
  controllerId: string;

  @Column({type: 'timestamp'})
  startTime: Date;

  @Column({type: 'timestamp'})
  endTime: Date;

  constructor(id: number, startTime: Date, endTime: Date, controller: Controller, controllerId: string) {
    this.id = id;
    this.controller = controller;
    this.controllerId = controllerId;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}