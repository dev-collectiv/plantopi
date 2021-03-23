import { Controller } from 'src/controllers/entities/controller.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class CronAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  time: string;

  @Column()
  action: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Controller, (controller) => controller.cronAction)
  controller: Controller;

  constructor(id: string, time: string, action: string, isActive: boolean, controller: Controller) {
    this.id = id;
    this.time = time;
    this.action = action;
    this.isActive = isActive;
    this.controller = controller;
  }
}
