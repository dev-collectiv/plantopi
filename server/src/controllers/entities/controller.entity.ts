import { Area } from '../../areas/entities/area.entity';
import { CronAction } from '../../cron-action/entities/cron-action.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, BeforeInsert } from 'typeorm';
import { Timetable } from '../../timetable/entities/timetable.entity';

@Entity()
export class Controller {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Area, (area) => area.controllers, {onDelete: 'CASCADE'})
  area: Area;

  @Column()
  areaId: string;

  @OneToMany(() => Timetable, timetable => timetable.controller)
  timetables: Timetable[];

  @Column()
  type: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  iotId?: string;

  @OneToOne(() => CronAction)
  cronAction?: CronAction;

  @BeforeInsert()
  generateIotId () {
    this.iotId = 'pump' + this.areaId;
  }

  constructor(id: number, area: Area, areaId: string, iotId: string, timetables: Timetable[], type: string, isActive: boolean, cronAction: CronAction) {
    this.id = id;
    this.area = area;
    this.areaId = areaId;
    this.type = type;
    this.timetables = timetables;
    this.isActive = isActive;
    this.cronAction = cronAction;
  }
}
