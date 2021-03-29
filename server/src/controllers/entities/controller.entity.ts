import { Area } from '../../areas/entities/area.entity';
import { CronAction } from '../../cron-action/entities/cron-action.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Timetable } from '../../timetable/entities/timetable.entity';

@Entity()
export class Controller {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Area, (area) => area.controllers, {onDelete: 'CASCADE'})
  area: Area;

  @OneToMany(() => Timetable, timetable => timetable.controller)
  timetables: Timetable[];

  @Column()
  type: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => CronAction)
  cronAction?: CronAction;

  constructor(id: number, area: Area, timetables: Timetable[], type: string, isActive: boolean, cronAction: CronAction) {
    this.id = id;
    this.area = area;
    this.type = type;
    this.timetables = timetables;
    this.isActive = isActive;
    this.cronAction = cronAction;
  }
}
