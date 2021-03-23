
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Cron {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  time!: string;

  @Column()
  cb!: string;

  @Column({ default: true })
  isActive!: boolean;

  // @OneToOne(() => Controller, (area) => area.user)
  // areas!: Area[];

}
