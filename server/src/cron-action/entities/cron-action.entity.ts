import { Controller } from 'src/controllers/entities/controller.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class CronAction {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  time!: string;

  @Column()
  cb!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToOne(() => Controller, (controller) => controller.cronAction)
  controller!: Controller;

}
