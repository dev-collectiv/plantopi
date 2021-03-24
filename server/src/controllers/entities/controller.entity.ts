import { Area } from '../../areas/entities/area.entity';
import { CronAction } from '../../cron-action/entities/cron-action.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

// Area ties to users with ManyToOne, users tie to area with OneToMany

@Entity()
export class Controller {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Area, (area) => area.controllers, {onDelete: 'CASCADE'})
  area: Area;

  @Column()
  type: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => CronAction, (cronAction) => cronAction.controller)
  cronAction?: CronAction;

  constructor(id: number, area: Area, type: string, isActive: boolean, cronAction: CronAction) {
    this.id = id;
    this.area = area;
    this.type = type;
    this.isActive = isActive;
    this.cronAction = cronAction;
  }
}
